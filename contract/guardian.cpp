#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

/*
  Test this contract

cleos push action eosguardians hi '["eosguardians"]' -p eosguardians@active
cleos push action eosguardians upsertrecord '["eosguardians"]' -p eosguardians@active
cleos push action eosguardians deleterecord '["eosguardians"]' -p eosguardians@active
cleos push action eosguardians readrecord '["eosguardians"]' -p eosguardians@active

cleos push action eosguardians requestacces '["eosguardians"]' -p eosguardians@active
cleos push action eosguardians grantaccess '["eosguardians"]' -p eosguardians@active
cleos push action eosguardians revokeaccess '["eosguardians"]' -p eosguardians@active

 */

class guardian : public eosio::contract {
public:
    using contract::contract;

    /// @abi action
    void hi( account_name user ) {
        require_auth( user );
        print( "Hello, ", name{user} );
    }

    /// @abi action
    void upsertrecord( account_name user ) {
        require_auth( user );
        print( "upsertrecord, ", name{user} );
    }

    /// @abi action
    void deleterecord( account_name user ) {
        require_auth( user );
        print( "deleterecord, ", name{user} );
    }

    /// @abi action
    void readrecord( account_name user ) {
        require_auth( user );
        print( "readrecord, ", name{user} );
    }

    /// @abi action
    void requestacces( account_name user ) {
        require_auth( user );
        print( "requestacces, ", name{user} );
    }

    /// @abi action
    void grantaccess( account_name user ) {
        require_auth( user );
        print( "grantaccess, ", name{user} );
    }

    /// @abi action
    void revokeaccess( account_name user ) {
        require_auth( user );
        print( "revokeaccess, ", name{user} );
    }

};

EOSIO_ABI( guardian, (hi)(upsertrecord)(deleterecord)(readrecord)(requestacces)(grantaccess)(revokeaccess) )
