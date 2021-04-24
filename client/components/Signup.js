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
                            //dropdown box to select user's language. -jc
                            <select className="Select" id="usersLanguage" name="usersLanguage" onChange="do something to handle change">
                                <options value="EN"> English </options>
                                <options value="SP"> Spanish </options>
                                <options value="FR"> French </options>
                            </select>
                        <input  type="submit" value="Create User"></input>
                    </form>
                </div>    


            )
        }
    };
    
export default Signup; 