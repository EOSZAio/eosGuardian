

### EOSIO token contract

Based on [Notes from EOS Hong Kong hackathon](https://git.mytribez.com/mytribez-io/smart-contracts/blob/master/docs/local_nodeos.md)

Create token account

```
cleos create account eosio user.token EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL EOS6Bq9j8QoLRLbU2cgyHDAKMhpHpxcTcCGQDYwyHMqKTUXPFUYAL
```

Then we need to upload the smart contract:

```
cleos set contract user.token /work/eosio.token -p user.token
```
Once that done, we can issue new token!

```
cleos push action user.token create '{"issuer":"user", "maximum_supply":"1000000000.00 ZAR"}' -p user.token
```

### Issue Tokens to Account "testacc"

Now that we have created the token, the issuer can issue new tokens to the account user we created earlier.

We will use the positional calling convention (vs named args).

```
cleos push action user.token issue '[ "testuser1", "100.00 ZAR", "memo" ]' -p user
```

Let's check testuser1's balance:

```
cleos get table user.token testuser1 accounts
```

You should see following output:

```
{
  "rows": [{
      "balance": "100.00 ZAR"
    }
  ],
  "more": false
}
```

Test a transfer of tokens

```
cleos push action user.token transfer '[ "testuser1", "testuser2", "50.00 ZAR", "Test transfer" ]' -p testuser1

cleos get table user.token testuser1 accounts
cleos get table user.token testuser2 accounts
```
