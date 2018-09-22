import axios from 'axios';
/****
 * 
 * 
 
 #!/bin/sh

# Example of push_transaction
# Tested with eos version 1.2.1
# below script are same as
# cleos push action eosio.token transfer '{"from":"applecookies","to":"blueberryjam","quantity":"1.0000 EOS","memo":"memo"}' -p applecookies@active
CODE="eosio.token"
ACTION="transfer"
ARGS='{"from":"applecookies","to":"blueberryjam","quantity":"1.0000 EOS","memo":"memo"}'
ACTOR="applecookies"
PUBLIC_KEY="EOS7Cg2SPDJDdAFZWkyx8s3U7CQq5RiWhj7M2Xkc9qRxSVYwU2jHQ" # ACTOR's

# edit this for your environment
CHAIN="curl --request POST --url http://127.0.0.1:8888/v1/chain"
WALLET="curl --request POST --url http://127.0.0.1:8900/v1/wallet"
CLEOS="./build/programs/cleos/cleos -u http://192.168.10.81:8888 --wallet-url=http://127.0.0.1:8900"

# 1. Get required information (chain_id, block_num, block_prefix, expiration)
GET_INFO=`$CHAIN/get_info`
CHAIN_ID=`echo $GET_INFO | jq '.chain_id'`
BLOCK_NUM=`echo $GET_INFO | jq '.last_irreversible_block_num'`
GET_BLOCK=`$CHAIN/get_block --data '{"block_num_or_id":'$BLOCK_NUM'}'`
BLOCK_PREFIX=`echo $GET_BLOCK | jq '.ref_block_prefix'`
TIMESTAMP=`echo $GET_BLOCK | jq '.timestamp'`
EXPIRATION=`jq -n ''$TIMESTAMP' | strptime("%Y-%m-%dT%H:%M:%S%Z") | mktime | . + 30 | todate | sub("Z"; .before)'`
echo "chain_id: $CHAIN_ID"
echo "block_num: $BLOCK_NUM"
echo "block_prefix: $BLOCK_PREFIX"
echo "expiration: $EXPIRATION"

# 2. Convert arguments: json -> binary
BINARGS=`$CHAIN/abi_json_to_bin --data '{"args":'"$ARGS"',"code":"'$CODE'","action":"'$ACTION'"}' | jq '.binargs'`
echo "binargs: $BINARGS"

# 3. Sign the transaction
TX='{"actions":[{"account":"'$CODE'","name":"'$ACTION'","authorization":[{"actor":"'$ACTOR'","permission":"active"}],"data":'$BINARGS'}],"signatures":[],"expiration":'$EXPIRATION',"ref_block_num":"'$BLOCK_NUM'","ref_block_prefix":"'$BLOCK_PREFIX'"}'
echo "TX: $TX"
SIGNED_TX=`$WALLET/sign_transaction --data '['$TX', ["'$PUBLIC_KEY'"], '$CHAIN_ID']'`
echo "SIGNED_TX: $SIGNED_TX"

# 4. Pack the signed_transaction
PACKED_TX=`$CLEOS convert pack_transaction ''$SIGNED_TX''`
echo "PACKED_TX: $PACKED_TX"

# 5. Call push transaction using packed transaction
echo "\n-- Results of push_transaction --"
$CHAIN/push_transaction --data ''"$PACKED_TX"''
echo ""

 * 
 */

const EOSIO_CONFIG = {
 // httpEndpoint: 'https://api.eosnewyork.io/',
 //chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  httpEndpoint: 'http://eos.eosza.io:8888/',
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  getInfo:'v1/chain/get_info',
  getBlock: 'v1/chain/get_block',
  getAccount:'v1/chain/get_account',
  getBalance:'v1/chain/get_currency_balance',
  //keyProvider: [process.env.REACT_APP_EOSIO_PRIVATE_KEY],
  broadcast: true,
  sign: true
}


// Update the edited post or add post to posts if a new post
export const getInfo = async () => {
  /*let alreadyAdded = false
  let updatedPosts = prevState.posts.map(post => {
    if ((post._id.timestamp === updatedPost._id.timestamp) && (post._id.author === updatedPost._id.author)) {
      alreadyAdded = true
      return { ...post, ...updatedPost }
    }
    return post
  })

  if (!alreadyAdded) {
    updatedPosts = [{ ...updatedPost, likes: 0 }, ...updatedPosts]
  }

  return */
  const response = await axios.get(EOSIO_CONFIG.httpEndpoint +  EOSIO_CONFIG.getInfo);
  return response;
}

export const getBlock = async (blockNum) => {
  const jdata = {
    block_num_or_id: blockNum
  }
  const response = await axios.post(EOSIO_CONFIG.httpEndpoint +  EOSIO_CONFIG.getBlock, JSON.stringify(jdata));
  return response.data;
}

/*export const getAccountInfo = async(account) => {
  const args = {
    account_name: account
  }
  const response = await axios.post(EOSIO_CONFIG.httpEndpoint +  EOSIO_CONFIG.getAccount, JSON.stringify(args))
  return response;
}*/

export const getAccountInfo = async(account, uid) => {
  const args = {
    account_name: account
  }
  const response =  await axios.post(EOSIO_CONFIG.httpEndpoint +  EOSIO_CONFIG.getAccount, JSON.stringify(args))
  return {response, uid};
}


export const doTransaction = async(args, code, actor, action) => {
  CODE="eosio.token"
  ACTION="transfer"
  ARGS='{"from":"applecookies","to":"blueberryjam","quantity":"1.0000 EOS","memo":"memo"}'
  ACTOR="applecookies"

  getInfo().then(result => {
    let blockNum = result.data.last_irreversible_block_num
    let block = getBlock(blockNum);
  
    return block;
  }).then(result =>{
    let blockPrefix = result.ref_block_prefix;
    console.log(blockPrefix)
    let expireInSeconds = 30;
    let timestamp = result.timestamp;
    let expiration = new Date(new Date(timestamp + 'Z').getTime() + expireInSeconds * 1000).toISOString().split('.')[0]
    console.log(expiration)
  }).then(result => {
   

  })

  /*CHAIN_ID=`echo $GET_INFO | jq '.chain_id'`
BLOCK_NUM=`echo $GET_INFO | jq '.last_irreversible_block_num'`
GET_BLOCK=`$CHAIN/get_block --data '{"block_num_or_id":'$BLOCK_NUM'}'`
BLOCK_PREFIX=`echo $GET_BLOCK | jq '.ref_block_prefix'`
TIMESTAMP=`echo $GET_BLOCK | jq '.timestamp'`
EXPIRATION=`jq -n ''$TIMESTAMP' | strptime("%Y-%m-%dT%H:%M:%S%Z") | mktime | . + 30 | todate | sub("Z"; .before)'`
echo "chain_id: $CHAIN_ID"

let chainId = info.chain_id;
let blockNum = info.last_irreversible_block_num
let block = getBlock(blockNum);
let blockPrefix = block.ref_block_prefix;
let timestamp = block.timestamp;
let expiration = new Date(new Date(timestamp + 'Z').getTime() + expireInSeconds * 1000).toISOString().split('.')[0]

*/
}


