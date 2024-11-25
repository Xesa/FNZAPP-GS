function retrieveCredentials(bank) {
  
  try {

  var encryptedBankCredentials = getBankProperties(bank);
  var secretToken = getSecretToken();

  var cipher = new cCryptoGS.Cipher(secretToken, 'aes');

  return {
    'user': cipher.decrypt(encryptedBankCredentials['user']),
    'pass': cipher.decrypt(encryptedBankCredentials['pass'])
  };

  } catch(err) {
    console.error(err.message);
    return null;
  }
}

function test() {
  console.log(retrieveCredentials("Sabadell"));
}

function getSecretToken() {
  return 'secret-token';
}

function getBankProperties(bank) {

  try{

    // Check if the property 'banks' exists
    var userProperties = PropertiesService.getUserProperties().getProperty('banks');

    if (userProperties == null) {
      throw new Error(`Missing 'banks' property in UserProperties.`);
    }

    // Check if the bank exists amongst the UserProperties
    var bankProperties = JSON.parse(userProperties);

    if (bank in bankProperties) {

      // Check if the bank has the 'user' and 'pass' properties
      bankCredentials = bankProperties[bank];

      if (!('user' in bankCredentials) || !('pass' in bankCredentials)) {
        throw new Error(`Bank '${bank}' missing credentials in UserProperties.`);
      } else {
        return bankCredentials;
      }
      
    } else {
      throw new Error(`Missing bank '${bank}' information in UserProperties.`);
    }

  } catch (err) {
    console.error(err.message);
    return null;
  }
}

function encryptCredentials(bank, user, pass) {

  try {

    // Check if parameters are empty
    if (bank == "" || user == "" || pass == "") {
      throw new Error(`Bank credentials cannot be empty.`);
    }

    // Check if bank is included in the available bank list
    if (!BANK_LIST.includes(bank)) {
      throw new Error(`Bank '${bank}' is not amongst the available bank list.`);
    }

    // Check if the UserProperties has the 'banks' property and creates it if not
    var userProperties = PropertiesService.getUserProperties();

    if (userProperties.getProperty('banks') == null) {
      userProperties.setProperty('banks', '');
    }

    // Prepares the cipher
    var secretToken = getSecretToken();
    var cipher = new cCryptoGS.Cipher(secretToken, 'aes');

    // Gets the 'banks' property from UserProperties and adds/updates the credentials
    var bankProperties = JSON.parse(userProperties.getProperty('banks'));

    var bankCredentials = {
      'user' : cipher.encrypt(user),
      'pass' : cipher.encrypt(pass)
    };

    bankProperties[bank] = bankCredentials;

    // Sets the 'banks' property in the UserProperties
    var jsonProperties = JSON.stringify(bankProperties);
    userProperties.setProperty('banks', jsonProperties);

  } catch(err) {
    console.error(err.message);
  }
}
