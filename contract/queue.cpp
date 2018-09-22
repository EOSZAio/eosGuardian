#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;


/*
cleos wallet unlock --password PW5K4EJaofnfmcQzSttnDYkae6ifTTFzdt339hs5kRE6xzuC2LkWi

cleos create account eosio queue EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL


eosiocpp -o /work/queue/queue.wast /work/queue/queue.cpp
eosiocpp -g /work/queue/queue.abi /work/queue/queue.cpp
cleos set contract queue /work/queue/ --permission queue


cleos push action queue sendmsg '["testuser1", "testuser1", 1, "ciphertext", "capsule"]' -p testuser1@active

cleos push action queue deletemsg '["testuser1",1]' -p testuser1@active

*/
class queue: public eosio::contract {
    public:
        using contract::contract;

        //@abi action
        void sendmsg( account_name from, account_name to, uint64_t msg_id, const std::string & ciphertext, const std::string & capsule) {
            require_auth( from );
            messages_index messages( _self, _self );
            auto itr = messages.find(msg_id);
            if (itr != messages.end()) {
                std::string error = "msg_id already exists: " + std::to_string(msg_id);
                eosio_assert(false, error.c_str());
            }
            messages.emplace( from, [&](auto& msg){
                msg.msg_id = msg_id;
                msg.from = from;
                msg.to = to; 
                msg.ciphertext = ciphertext;
                msg.capsule = capsule;
            });
        }

        // @abi action
        void deletemsg( account_name to, uint64_t msg_id) {
            require_auth( to );
            messages_index messages(_self, _self);
            auto itr = messages.find(msg_id);
            if ( itr == messages.end() ) {
                std::string error = "msg_id does not exist: " + std::to_string(msg_id);
                eosio_assert(false, error.c_str());
            }
            
            if ( itr->to != to ) {
                std::string error = "Receipient not correct: " + eosio::name{itr->to}.to_string();
                eosio_assert( false, error.c_str());
            }
          
            messages.erase(itr);
         }
    private:

        //@abi table messages i64
        struct messages {
            uint64_t msg_id;
            account_name from;
            account_name to;
            std::string ciphertext;
            std::string capsule;
            uint64_t primary_key() const { return msg_id;}
        };
        
        typedef eosio::multi_index<N(messages), messages> messages_index;
};

EOSIO_ABI( queue, (sendmsg)(deletemsg) )