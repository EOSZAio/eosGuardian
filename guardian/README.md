## Setup local EOS node

Follow the process described in [EOSIO Docker Quickstart](https://developers.eos.io/eosio-nodeos/docs/docker-quickstart)

* Create the 'default' wallet.
* Verify that the wallet is unlocked (use your own wallet password).
```
cleos wallet unlock --password PW5K4EJaofnfmcQzSttnDYkae6ifTTFzdt339hs5kRE6xzuC2LkWi
```
* Import the following keys into the wallet

```
# Public key : EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
cleos wallet import --name default --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

# Public key : EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos wallet import --name default --private-key 5JvbwA3ZACtEYmypfJ114p6ZUBuBepRGzTP9MxJkT9JVuNqHfqz

```

Create user account

```
cleos create account eosio user EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
```

### EOS guardian

```
cleos create account eosio eosguardians EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
```

## Compile the smart contract

Next, we need to generate a WASM file. A WASM file is a compiled smart contract ready to be uploded to EOSIO network.

```
eosiocpp -o /work/guardian/guardian.wast /work/guardian/guardian.cpp
```

Please note the path to the files is within Docker container, not your host machine.

We now need to generate an ABI file:

```
eosiocpp -g /work/guardian/guardian.abi /work/guardian/guardian.cpp
```

Congratulations! You have created your first smart contract! Lets upload this contract to the blockchain:

```
cleos set contract eosguardians /work/guardian/ --permission eosguardians
```

Run the transaction:

```
cleos push action eosguardians hi '["eosguardians"]' -p eosguardians@active
```




### More test users

Add a couple more test accounts for use in our app.

```
cleos create account eosio testuser1 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio testuser2 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio testuser3 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio testuser4 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
cleos create account eosio testuser5 EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
```



### Smart contract

The developer protal describes the creation of a '['hello world'](https://developers.eos.io/eosio-cpp/docs/hello-world)' smart contract. If we are working with the 'eos_dev' docker image the contract is already compiled and just needs to be loaded.

Create contract account

```
cleos create account eosio hello.code EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
```

Upload the contract:

```
cleos set contract hello.code /work/hello -p hello.code@active
```

Test it

```
cleos push action hello.code hi '["user"]' -p user@active
```

Check blockchain

```
docker logs -f nodeos
```

### Smart contrsact actions

####upsertrecord

Permission : user

| Field | Description |
| ------------- | --------------|
| user | EOS account name of data owner |
| key | Data key |
| hash | Hash or index of data stored off-chain |


####deleterecord

Permission : user

| Field | Description |
| ------------- | --------------|
| user | EOS account name of data owner |
| key | Data key |

####readrecord

Permission : requestor

| Field | Description |
| ------------- | --------------|
| user | EOS account name of data owner |
| key | Data key |
| requestor | EOS account of party requesting data |

####requestacces

NB Check spelling (1 's')

Permission : requestor

| Field | Description |
| ------------- | --------------|
| user | EOS account name of data owner |
| key | Data key |
| requestor | EOS account of party requesting data |

####grantaccess

Permission : user

| Field | Description |
| ------------- | --------------|
| user | EOS account name of data owner |
| key | Data key |
| requestor | EOS account of party requesting data |

####revokeaccess

Permission : user

| Field | Description |
| ------------- | --------------|
| user | EOS account name of data owner |
| key | Data key |
| requestor | EOS account of party requesting data |
