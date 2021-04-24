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
                        <label> Select your language 
                            <select className="Select" id="usersLanguage" name="usersLanguage" onChange="do something to handle change">
                                <option value="EN"> English </option>
                                <option value="SP"> Spanish </option>
                                <option value="FR"> French </option>
                            </select>
                        </label>    
                        <input  type="submit" value="Create User"></input>
                    </form>
                </div>    


            )
        }
    };
    
export default Signup; 