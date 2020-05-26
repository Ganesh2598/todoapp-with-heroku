import React , {Component} from 'react'

import List from './Lists'
import './Main_content_style.css'


class Maincontent extends Component{

    constructor(props){
        super(props)
        //console.log(props.props.location.state)
        if(props.props.location.state !== undefined){
            this.user_id=props.props.location.state.googleusercontent.Ea;
            
            window.localStorage.setItem("user_id",this.user_id);
        }else{
            this.user_id=window.localStorage.getItem("user_id");
        }
        //console.log(typeof(this.user_id))
        this.state={
            list:[],
            deleted:[],
            cur_item:""
        }
    }

    inputHandler=(e)=>{
        this.setState({
            cur_item:e.target.value
        })
       
    }

    async componentDidMount(){
        try {
            const response = await fetch(`/todos/${this.user_id}`,{
                headers:{"Content-Type":"application/json","Accept":"application/json"}
            });
            const data = await response.json();
            //console.log(data)
            const tasks = data.map(obj => obj.task) 
            this.setState({
                list:tasks.reverse(),
                cur_item:""
            })
        }catch(err){
            console.log(err)
        }
        
    }


    addHandler=async e =>{
        e.preventDefault();
        try{
            let task = this.state.cur_item
            let id = this.user_id
            const body = {task,id}
            const response = await fetch("/todos/",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })
            console.log(response.body)
        }catch(err){
            console.log(err)
        }
        
        try {
            const response = await fetch(`/todos/${this.user_id}`,{
                headers:{"Content-Type":"application/json","Accept":"application/json"}
            });
            const data = await response.json();
            console.log(data)
            const tasks = data.map(obj => obj.task) 
            this.setState({
                list:tasks.reverse(),
                cur_item:""
            })
        }catch(err){
            console.log(err)
        }
        
    }

    deleteHandler= async item=>{
        try{
            const itemToDelete=[this.user_id,item.item]
            const deleted = await fetch(`/todos/${itemToDelete}`,{
                method : "DELETE"
            });
            //console.log(deleted)
        }catch(err){
            console.log(err)
        }
        //console.log(this.state.list)
        const updated = this.state.list.filter(task => task !== item.item)
        const deleteitem = [...this.state.deleted,item.item]
        this.setState({
            list:updated,
            deleted:deleteitem
        })
        
    }

    undoHandler = async e =>{
        console.log(this.state.deleted)
        try{
            if(this.state.deleted.length>0){
                let task = this.state.deleted[0]
                const updateDelete = this.state.deleted.filter(tasks => tasks !== task)
                console.log(updateDelete)
                this.setState({
                    deleted : updateDelete
                })
                let id = this.user_id
                const body = {task,id}
                const response = await fetch("/todos/",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })
            console.log(response.body)
            }
        }catch(err){
            console.log(err)
        }
        try {
            const response = await fetch(`/todos/${this.user_id}`,{
                headers:{"Content-Type":"application/json","Accept":"application/json"}
            });
            const data = await response.json();
            console.log(data)
            const tasks = data.map(obj => obj.task) 
            this.setState({
                list:tasks.reverse(),
                cur_item:""
            })
        }catch(err){
            console.log(err)
        }


    }

    render(){
        return (
            <div className="main_content">
                <div className="header">
                    <input type="text" value={this.state.cur_item} placeholder="Enter Text" onChange={this.inputHandler}/>
                    <button onClick={this.addHandler}>Add</button>
                </div>
                <List props={this.state.list} delete={this.deleteHandler}></List>
                <div className="footer">
                    <button onClick={this.undoHandler}>Undo</button>
                </div>
            </div>
        )
    }
}

export default Maincontent