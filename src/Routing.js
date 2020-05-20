import {Route,Switch,Router} from 'react-router-dom'
import Google from './GoogleLogin'
import history from './History'
import App from './App'
import React ,{Component} from 'react'

class Routing extends Component{
    
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Google}/>
                    <Route path="/App" component={App}/>
                </Switch>
            </Router>
        )
    }
}

export default Routing