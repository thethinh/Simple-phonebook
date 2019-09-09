
var readlineSync = require('readline-sync');
var fs = require('fs');
var accents = require('remove-accents');

var contacts = [];

function readData()
{
	var filecontent = fs.readFileSync('./data.json');
	contacts = JSON.parse(filecontent);
}

function menu(){
	console.log('');
	console.log('1. Add contact');
	console.log('2. Edit contact');
	console.log('3. Delete contact');
	console.log('4. Search contact');
	console.log('5. Show all contact');
	console.log('6. Exit');
};

function Save()
{
	var content = JSON.stringify(contacts);
	fs.writeFileSync('./data.json', content,{encoding:'UTF-8'});
}

function Addcontact()
{
	var _name = readlineSync.question('Name : ',{encoding: 'UTF-8'});
	var _phone = readlineSync.question('Phone : ',{encoding:'UTF-8' });
	var contactNew={
		name: _name,
		phone: parseInt(_phone)
	}
	contacts.push(contactNew);
	var request = readlineSync.question('do you sure add contact ? : ',{encoding: 'UTF-8'});
	if(request==='y')//yes
	{
		Save();
	}
	else{
		return;
	}
}

function Editcontact()
{
	readData();
	var request = readlineSync.question('Write the name or phone you want to edit : ');
	contacts.find(function(x){
		if(x.name === request || x.phone===request)
		{
			var name = readlineSync.question('Write name : ');
			var phone = readlineSync.question('Write phone : ');
			x.name = name;
			x.phone=phone;
			console.log('Complete');
		}
	})
	Save();
}

function Deletecontact()
{
	readData();
	var request = readlineSync.question('Write the name or phone you want to delete : ');
	for(var i=0; i<contacts.length;++i)
	{
		if(contacts[i].name === request || contacts[i].phone===request)
		{
			contacts.splice(i,1);
			console.log('Delete complete');
		}
	}
	Save();
}

function Searchcontact()
{
	readData();
	var request = readlineSync.question('Write the name or phone you want to delete : ');
	for(var i=0; i<contacts.length;++i)
	{
		if(((accents.remove(contacts[i].name.toLowerCase())) === accents.remove(request.toLowerCase())) || (contacts[i].phone.toString().includes(request.toString()) === true))
		{
			console.log(contacts[i]);
		}
	}
}

function showallcontact()
{
	readData();
	for(var item of contacts)
	{
		console.log(item.name, item.phone);
	}
}


function main()
{
	readData();
	console.log('');
	console.log('               PHONEBOOK');
	do{
		menu();
		var option = readlineSync.question('Let select one number : ');
		switch(option) {
			case '1':
				Addcontact();
				break;
			case '2':
				Editcontact();
				break;
			case '3':
				Deletecontact();
				break;
			case '4':
				Searchcontact();
				break;
			case '5':
				showallcontact();
				break;
			case '6':
				return;
			default:
				console.log('Vui lòng thử lại');
				break;
		}
	}while(option!=='6')
	
}


main();


