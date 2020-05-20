import GoogleLogin from 'react-google-login'
import React,{Component} from 'react'
import history from './History'
import './App.css'

class Google extends Component{
    onSuccessHandler=(googleusercontent)=>{
        console.log(googleusercontent.googleId)
        history.push({
            pathname:"/app",
            state : { googleusercontent } 
        })
    }

    onFailureHandler=(error)=>{
        console.log(error)
        alert("Something Went wrong")
    }

    render(){
        return (
            <div className="main_content1">
                <div>
                <h1 className="heading">Login to Todo App</h1>
                <div style={{"textAlign":"center"}}>
                
                <GoogleLogin className="google" clientId="643033791342-jrqgv98qa2375ahr8ofb5imdfrls5f5i.apps.googleusercontent.com"
                buttonText="login"
                theme="dark"
                icon="false"
                onSuccess={this.onSuccessHandler}
                onFailure={this.onFailureHandler}
                cookiePolicy={'single_host_origin'}
                />
                </div>
            </div>

            </div>
         
            
        )
    }
}

export default Google