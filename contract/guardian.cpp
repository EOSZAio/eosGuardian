#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

/*
  Test this contract

cleos wallet unlock --password PW5K4EJaofnfmcQzSttnDYkae6ifTTFzdt339hs5kRE6xzuC2LkWi

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
    /// @abi action
    void upsertrecord( const account_name user, const account_name key, const std::string msg ) {
        require_auth( user );
        print( "upsertrecord, ", name{user}, ", ", name{key}, ", ", msg );
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

};

EOSIO_ABI( guardian, (hi)(upsertrecord)(deleterecord)(readrecord)(requestacces)(grantaccess)(revokeaccess) )
