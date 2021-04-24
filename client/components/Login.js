import React, { Component } from 'react'

//have login and password input field 
//with "login" button and signup link
    class Login extends Component {





        render(){

            return(

                <div className="Login">
                    <form method="POST" action='/login'>
                        <input name="username" type="text" placeholder="username"></input>
                        <input name="password" type="password" placeholder="password"></input>
                        <input  type="submit" value="login"></input>
                    </form>
                    <a href='./signup'>Sign up</a>
                </div>    


            )
        }
    };
export default Login; 