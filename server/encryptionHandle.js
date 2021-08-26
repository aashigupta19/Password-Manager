// encrypt
import crypto from "crypto"; // comes with nodejs

const secretVariable = 'pppppppppppppppppppppppppppppppp';


const encrypt = (password)=>{
    const iv = Buffer.from(crypto.randomBytes(16)); //identifier
    
    //cipher
const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secretVariable), iv);

const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);


return {iv: iv.toString("hex"),
    pwd: encryptedPassword.toString("hex")
};

};



// decrypt
const decrypt = (encrypted) =>{
const decipher = crypto.createDecipheriv('aes-256-ctr', 
Buffer.from(secretVariable), 
Buffer.from(encrypted.iv, 'hex'));

const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encrypted.pwd, 'hex')), 
    decipher.final()]);


    return decryptedPassword.toString();

};


const defExp = {encrypt, decrypt};
export default defExp;
