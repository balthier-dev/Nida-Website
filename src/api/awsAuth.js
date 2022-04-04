import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js'

const CLIENT_ID = process.env.VUE_APP_COGNITO_CLIENT_ID;
const USERPOOL_ID = process.env.VUE_APP_COGNITO_USERPOOL_ID;
var authData = {
    ClientId : CLIENT_ID,
    UserPoolId : USERPOOL_ID,
}

var auth = new CognitoUserPool( authData );

export default {
    createAccount: async ( formData, wallet ) =>
    {
        console.log( "authData", authData );
        console.log( formData, wallet );
        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: formData.email
        };

        let datawallet = {
            Name: 'custom:wallet_address',
            Value: wallet,
        };

        let referalcode = {
            Name: 'custom:referal_code',
            Value: '12345ABC'
        }

        // let dataName = {
        //     Name: 'custom:display_name',
        //     Value: formData.name
        // }

        // let dataCountry = {
        //     Name: 'custom:country',
        //     Value: formData.country
        // }

        let reg = new RegExp( /[\w\W]+[@]+/g, "gi" );
        let matches = formData.email.match( reg );
        let user = wallet;
        if ( matches.length > 0 )
        {
            user = matches[ 0 ].slice( 0, matches[ 0 ].length - 1 );
        }
        let attributeEmail = new CognitoUserAttribute( dataEmail );
        let attributewallet = new CognitoUserAttribute(
            datawallet
        );
        var attributereferalcode = new CognitoUserAttribute( referalcode )
        // var attributerecountry = new CognitoUserAttribute(dataCountry)
        // var attributedisplay_name = new CognitoUserAttribute(dataName)

        attributeList.push( attributeEmail );
        attributeList.push( attributewallet );
        attributeList.push( attributereferalcode )
        // attributeList.push( attributerecountry )
        // attributeList.push(attributedisplay_name)

        let res = await auth.signUp( user, formData.password, attributeList, null, ( err, result ) =>
        {
            if ( err )
            {
                console.log( "auth.signUp error", err );
                return;
            }
        
            console.log( 'user name is ' + result.user.getUsername() );
            console.log( 'call result: ' + result );
            return result;
        } );
        return res;
    },
    updateWallet: async ( email, wallet ) =>
    {
        let attributeList = [];
        let reg = new RegExp( /[\w\W]+[@]+/g, "gi" );
        let matches = email.match( reg );
        let user = wallet;
        if ( matches.length > 0 )
        {
            user = matches[ 0 ].slice( 0, matches[ 0 ].length - 1 );
        }
    
        let userData = {
            Username: user,
            Pool: auth,
        };
        console.log( "userData :", userData );
        let cognitoUser = new CognitoUser( userData );

        let datawallet = {
            Name: 'custom:wallet_address',
            Value: wallet,
        };

        let attributewallet = new CognitoUserAttribute( datawallet );
        attributeList.push( attributewallet );
    
        cognitoUser.updateAttributes( attributeList, ( err, result ) =>
        {
            if ( err )
            {
                console.log( 'call error: ' + err );
                alert( err.message || JSON.stringify( err ) );
                return;
            }
            console.log( 'call result: ' + result );
        } );
    },
}
