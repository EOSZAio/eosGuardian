import './../../shim';
import EOSJS from 'eosjs';

const KEYS = [
  '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
  '5JvbwA3ZACtEYmypfJ114p6ZUBuBepRGzTP9MxJkT9JVuNqHfqz'
];

const RPC_API_URL = 'http://localhost:8888';

export function eos() {
  const config = {
    keyProvider: KEYS, // WIF string or array of keys..
    httpEndpoint: RPC_API_URL,
    broadcast: true,
    sign: true
  };

  const localNet = EOSJS(config);
  return localNet;
}


export function getInfo() {
	const net = eos().getInfo({}).then(info => {
		return info;
	});
	return net;
}

export const getAccountInfo = async(account, uid) => {
  const net = await eos().getAccount(account).then(info => {return info;})
  return { data: net, uid };
}

export const transaction = async(actor, action, data) => 
{
   return await eos().transaction({
    actions: [
      {
        account: 'hello.code',
        name: action,
        authorization: [
          {
            actor,
            permission: 'active'
          }
        ],
        data: {
          ...data
        }
      }
    ]
  });
}