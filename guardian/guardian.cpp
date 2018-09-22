#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

/*
  Test this contract

cleos wallet unlock --password PW5K4EJaofnfmcQzSttnDYkae6ifTTFzdt339hs5kRE6xzuC2LkWi

cleos create account eosio eosguardians EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio testuser1 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL

eosiocpp -o /work/guardian/guardian.wast /work/guardian/guardian.cpp
eosiocpp -g /work/guardian/guardian.abi /work/guardian/guardian.cpp
cleos set contract eosguardians /work/guardian/ --permission eosguardians

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

    /// @abi action
    void hi( account_name user ) {
        require_auth( user );
        print( "Hello, ", name{user} );
    }

    // const account_name owner, const account_name key, const std::string msg
    // cleos push action eosguardians upsertrecord '["testuser1","emergencymed","somehash"]' -p testuser1@active
    // Hack using account_name for key
    /**
    code - Refers to an account_name where a contract has been published.
    scope - An account_name that the data in question belongs to.
    table_name - The name of the table that is stored in memory.
    */

    /// @abi action
    void eraseTable(const account_name user) {
        data_record_index data_records(_self, user);
        auto data_record_by_user = data_records.get_user<N(byuser)>();
        
        for(const auto& record : account_by_id_index) {
            //account_by_id_index.erase(record); //this does not work :(
            data_records.erase(record);
        }
    }


    /// @abi action
    void upsertrecord( const account_name user, const account_name field, const std::string msg ) {
        require_auth( user );
        print( "upsertrecord, ", name{user}, ", ", name{field}, ", ", msg );

        // Insert
      data_record_index data_records(_self, user);  //code, scope

      data_records.emplace(_self, [&]( auto& g ) {
        g.field = field;
        g.user = user;
        g.msg = msg;
      });
    }

    // cleos push action eosguardians deleterecord '["testuser1","emergencymed"]' -p testuser1@active
    /// @abi action
    void deleterecord( const account_name user, const account_name key ) {
        require_auth( user );
        print( "deleterecord, ", name{user}, ", ", name{key} );
    }

    // cleos push action eosguardians readrecord '["testuser1","emergencymed","testuser1"]' -p testuser1@active
    /// @abi action
    void readrecord( const account_name user, const account_name key, const account_name requestor ) {
        require_auth( requestor );
        print( "readrecord, ", name{user}, ", ", name{key}, ", ", name{requestor} );
    }

    // cleos push action eosguardians requestacces '["testuser1","emergencymed","testuser2"]' -p testuser2@active
    /// @abi action
    void requestacces( const account_name user, const account_name key, const account_name requestor ) {
        require_auth( requestor );
        print( "requestacces, ", name{user}, ", ", name{key}, ", ", name{requestor} );

        auth_index authorizations(user, key);
        auto auth = authorizations.find(key);
        if (auth != authorizations.end()) {
            print( "Record not found");

        }

/*
       colourrule_index colourrules(_self, colour);
      auto rule = colourrules.find(rule_id);
      eosio_assert( rule != colourrules.end(), "Rule not found" );

      colourrules.modify(rule, 0, [&]( auto& r ) {
        r.is_active = is_active;
      });

 */

    }

    // cleos push action eosguardians grantaccess '["testuser1","emergencymed","testuser2"]' -p testuser2@active
    /// @abi action
    void grantaccess( const account_name user, const account_name key, const account_name requestor ) {
        require_auth( user );
        print( "grantaccess, ", name{user}, ", ", name{key}, ", ", name{requestor} );
    }

    // cleos push action eosguardians revokeaccess '["testuser1","emergencymed","testuser2"]' -p testuser2@active
    /// @abi action
    void revokeaccess( const account_name user, const account_name key, const account_name requestor ) {
        require_auth( user );
        print( "revokeaccess, ", name{user}, ", ", name{key}, ", ", name{requestor} );
    }



    /// @abi table data_records i64
    struct data_records {
        uint64_t     key;
        account_name field;
        account_name user;
        std::string  msg; 

        auto primary_key() const { return key; }
        account_name get_user()const {return user;}

        EOSLIB_SERIALIZE( data_records, ( user )( key )( field )( msg ) )
    };

     typedef eosio::multi_index< N(data_records), data_records> data_record_index;
     typedef eosio::multi_index< N(data_records), data_records,
      indexed_by<N(byuser), const_mem_fun<data_records,account_name, &data_records::get_user>> > data_records_by_user;


    /// @abi table data_grants i64
    struct data_grants {
        uint64_t     key;
        account_name user;
        account_name requestor;
        std::string  status;
        uint64_t     datefrom;
        uint64_t     dateto;

        auto primary_key() const { return key; }

        EOSLIB_SERIALIZE( data_grants, ( user )( key )( requestor )( status )( datefrom )( dateto) )
    };
    typedef eosio::multi_index< N(data_grants), data_grants> auth_index;
};

EOSIO_ABI( guardian, (hi)(upsertrecord)(deleterecord)(readrecord)(requestacces)(grantaccess)(revokeaccess) )
