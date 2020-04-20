import ldap from "ldapjs"

const dn:string = 'OU=深圳冰川,DC=q1oa,DC=com';
const url:string = 'ldap://172.16.0.10';
const opts:object = {
  scope: 'sub'
};
const bindName:string = 'whadmin';
const bindPwd:string = 'tXzbwXLmdoV4Gl2T';
const client:any = ldap.createClient({ url });

client.bind(bindName, bindPwd, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('bind successful');
});

let users:any = [];
let count:number = 0;

export default function getLdap() {
    return new Promise(resolve => {
        //@ts-ignore
        client.search(dn, opts, function(req, res) {
            res.on('searchEntry', function(result) {
                users[count] = result.object;
                count++;
            });

            res.on('end', function() {
                resolve(users);
            });
        });
    });
}