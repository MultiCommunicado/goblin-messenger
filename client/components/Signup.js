import React, { Component } from 'react';

//have signup and password input field 
//with "signup" button and signup link
    class Signup extends Component {


        render(){

            return(

                <div className="Login">
                    <form method="POST" action='/signup'>
                        <input name="username" type="text" placeholder="username"></input>
                        <input name="password" type="password" placeholder="password"></input>
                        <input  type="submit" value="Create User"></input>
                    </form>
                </div>    


            )
        }
    };
    
export default Signup; 