#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

/*
  Test this contract

cleos wallet unlock --password PW5K4EJaofnfmcQzSttnDYkae6ifTTFzdt339hs5kRE6xzuC2LkWi

cleos create account eosio eosguardians EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio testuser1 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio user.token EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL

eosiocpp -o /work/guardian/guardian.wast /work/guardian/guardian.cpp
eosiocpp -g /work/guardian/guardian.abi /work/guardian/guardian.cpp
cleos set contract eosguardians ../guardian/ -p eosguardians@active

****TOKEN
cleos set contract user.token ../eosio.token -p user.token@active
cleos push action user.token create '{"issuer":"eosio", "maximum_supply":"1000000000.00 ZAR"}' -p user.token
cleos push action user.token issue '[ "testuser1", "55.00 ZAR", "memo" ]' -p eosio

cleos push action eosguardians upsertrecord '["testuser1","emergencymed","somehash"]' -p testuser1@active
cleos push action eosguardians deleterecord '["testuser1","emergencymed"]' -p testuser1@active
cleos push action eosguardians readrecord '["testuser1","emergencymed","testuser2"]' -p testuser2@active
cleos push action eosguardians requestacces '["testuser1","emergencymed","testuser2"]' -p testuser2@active
cleos push action eosguardians grantaccess '["testuser1","emergencymed","testuser2"]' -p testuser1@active
cleos push action eosguardians revokeaccess '["testuser1","emergencymed","testuser2"]' -p testuser1@active

 */

class guardian : public eosio::contract {
public:
    using contract::contract;
        //@abi action
        void upsert( account_name user, uint64_t msg_id, const std::string & data, std::string & field) {
            require_auth( user );
            permissions_index permissions( _self, _self );
            auto itr = permissions.find(msg_id);
            if (itr != permissions.end()) {
                std::string error = "msg_id already exists: " + std::to_string(msg_id);
                eosio_assert(false, error.c_str());
            }
            permissions.emplace( user, [&](auto& msg){
                msg.msg_id = msg_id;
                msg.user = user;
                msg.data = data;
                msg.field = field;
            });
        }

        // @abi action
        void deletemsg( account_name user, uint64_t msg_id) {
            require_auth( user );
            permissions_index permissions(_self, _self);
            auto itr = permissions.find(msg_id);
            if ( itr == permissions.end() ) {
                std::string error = "msg_id does not exist: " + std::to_string(msg_id);
                eosio_assert(false, error.c_str());
            }
            
            if ( itr->user != user ) {
                std::string error = "Receipient not correct: " + eosio::name{itr->user}.to_string();
                eosio_assert( false, error.c_str());
            }
          
            permissions.erase(itr);
         }

         /// @abi action
        void erasetable(account_name user) {
            permissions_index permissions(_self, user);
            //auto data_record_by_user = datarecords.get_index<N(byuser)>();

            print("Items sorted by primary key:\n");
            for( const auto& item : permissions ) {
                print(" ID=", item.msg_id, ", user=", name{item.user}, ", field=", item.field, "\n");
            }
            
            /*for(const auto& record : data_record_by_user) {
                //account_by_id_index.erase(record); //this does not work :(
                datarecords.erase(record);
            }*/
        }

    private:

        //@abi table permissions i64
        struct permissions {
            uint64_t msg_id;
            account_name user;
            std::string field;
            std::string data;
            //account_name get_user()const {return user;}
            uint64_t primary_key() const { return msg_id;}
        };
        
        typedef eosio::multi_index<N(permissions), permissions> permissions_index;
        //typedef eosio::multi_index< N(datarecords), datarecords,
        //indexed_by<N(byuser), const_mem_fun<datarecords,account_name, &datarecords::get_user>> > data_records_by_user;
    
};

EOSIO_ABI( guardian, (upsert)(deletemsg)(erasetable) )
