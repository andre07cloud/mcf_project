

const User = require('../../models/users');
const role = require('../../models/roles');
const cryptoJS = require("crypto-js");

exports.createSuperUser =function () {
    User.findOne({role: role.ROLE_SUPER_ADMIN}, (err, user) => {

      if (err){
			console.log('err');
			console.log(err)
		} 
		else {

			if(user==null)
			{
				var data = {};
					data.email= "superadmin@mcf.com";
					data.firstName= "SUPER";
					data.lastNme= "ADMIN";
                    data.username = process.env.SUPER_USERNAME;
					data.locked= false;
					data.password= cryptoJS.AES.encrypt(process.env.SUPER_SEC, process.env.PASS_SEC).toString();
					data.role= role.ROLE_SUPER_ADMIN;
					data.isAdmin= true;
                    data.token = null;
					data.displayName= data.firstName + ' ' + data.lastName;
				var user = new User(data);
				
				var message = null;

					// Add missing user fields
					//user.provider = 'local-token';	

					// Then save the user
					user.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('Super Admin compte created')
						}
					});
                    //res.json(user);
			}
			else
			{
				console.log('Super Admin compte existe')
				return true;
				
			}
        }
    });
    };


     