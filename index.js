/*
import React 
import ReactDOM 
The project is made in codepen.io
*/

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      count:true,
      interval: undefined,
      session_val:25 ,
      break_val:5,
      time:{minutes:"25",seconds:"00"},
      isbreak: false,
      current:"session_val",
      break_time:{minutes:"05",seconds:"00"},
    }
    this.inc_s = this.inc_s.bind(this) 
    this.inc_b = this.inc_b.bind(this) 
    this.dec_s = this.dec_s.bind(this) 
    this.dec_b = this.dec_b.bind(this) 
    this.count = this.count.bind(this) 
    this.start_stop_count = this.start_stop_count.bind(this) 
    this.reset = this.reset.bind(this)
  }

  //Inc or Dec Values
  inc_s(){
     if(this.state.session_val<60)
    {
      const value = this.state.session_val+1
      let time = this.state.time
      if(value>=10){
      time.minutes = value.toString()}
      else{
        time.minutes ="0"+ value.toString()
      }
      this.setState({session_val:value,time:time})
    }
   
  }
  inc_b(){
       if(this.state.break_val<60)
    {
      const value = this.state.break_val+1
      let time = this.state.break_time
      if(value>=10){
      time.minutes = value.toString()}
      else{
        time.minutes ="0"+ value.toString()
      }
      this.setState({break_val:value,break_time:time})
    }
  }
  dec_s(){
     if(this.state.session_val>1)
    {
      const value = this.state.session_val-1
      let time = this.state.time
      if(value>=10){
      time.minutes = value.toString()}
      else{
        time.minutes ="0"+ value.toString()
      }
      this.setState({session_val:value,time:time})
    }
   
  }
  dec_b(){
    if(this.state.break_val>=2)
    {
      const value = this.state.break_val-1
      let time = this.state.break_time
      if(value>=10){
      time.minutes = value.toString()}
      else{
        time.minutes ="0"+ value.toString()
      }
      this.setState({break_val:value,break_time:time})
    }
  }
 
  //Count
  count(){
    //For 00 : 00 format
    if(parseInt(this.state.time.minutes)>0|parseInt(this.state.time.seconds)>0){
      if(parseInt(this.state.time.seconds)>10){
        const val = parseInt(this.state.time.seconds)-1
        let time = this.state.time
        time.seconds = val.toString()
        this.setState({time:time})
      }
      else if(parseInt(this.state.time.seconds)<=10&parseInt(this.state.time.seconds)>0){
        const val = parseInt(this.state.time.seconds)-1
        let time = this.state.time
        time.seconds = "0" + val.toString()
        this.setState({time:time})
      }
      
      else if(parseInt(this.state.time.minutes)>0 & parseInt(this.state.time.seconds)==0){
        if(this.state.time.minutes>10){
        let time = this.state.time
        const val = parseInt(this.state.time.minutes)-1
        time.minutes = val.toString()
        time.seconds = "59"
        this.setState({time:time})}
        else{
        let time = this.state.time
        const val = parseInt(this.state.time.minutes)-1
        time.minutes = "0"+val.toString()
        time.seconds = "59"
        this.setState({time:time})}
        }
      }
    //When timer gets 00:00
    else{
      const info = document.getElementById("timer-label")
      const session_time = this.state.session_val
      const break_time = this.state.break_val
      let b_time = this.state.time
      let s_time = this.state.time
      const color_b = "rgb(255, 204, 230)"
      const color_s = "rgb(204, 204, 255)"
      const body = document.getElementById("body")
      const audio = document.getElementById("beep")
      s_time.seconds = "00"
      {session_time>10 ? s_time.minutes = session_time.toString() : s_time.minutes = "0"+ session_time.toString() }
      b_time.seconds = "00"
      {break_time>10 ? b_time.minutes = break_time.toString() : b_time.minutes = "0" +  break_time.toString()}
      
      {this.state.isbreak ? info.innerHTML="Session" : info.innerHTML="Break"}
     {this.state.isbreak ? this.setState({time:s_time}): this.setState({time:b_time,isbreak:!this.state.isbreak})} 
      audio.play()
      {this.state.isbreak ? body.animate([{backgroundColor:body.style.backgroundColor},{backgroundColor:color_b}],{duration:2000,fill:"forwards"}) : body.animate([{backgroundColor:body.style.backgroundColor},{backgroundColor:color_s}],{duration:2000,fill:"forwards"})}
      // ALARM  FUNCTION
    }
  }

  
  start_stop_count(){
    
    if(this.state.count){
      const interval = setInterval(this.count,1000)
      this.setState({count:false,interval:interval})}
    else if(this.state.count==false){
      clearInterval(this.state.interval)
      this.setState({count:true})
    }
  }
  //Reset body color, audio, session and break = state , clear Interval, and label
  reset(){
    const body = document.getElementById("body")
    const audio = document.getElementById("beep")
    const color = "rgb(241, 230, 255)"
    const info = document.getElementById("timer-label")
    
    audio.pause()
    audio.currentTime = 0
    
    info.innerHTML="Session"
    clearInterval(this.state.interval)
    
    this.setState({
      count:true,
      interval: undefined,
      session_val:25 ,
      break_val:5,
      time:{minutes:"25",seconds:"00"},
      isbreak: false,
      current:"session_val",
      break_time:{minutes:"05",seconds:"00"},
    })
    
    body.animate([{backgroundColor:body.style.backgroundColor},{backgroundColor:color}],{duration:2000,fill:"forwards"})
    
  }
 
  render(){
    
    const break_minutes = this.state.break_val
    const session_minutes = this.state.session_val
    const time = `${this.state.time.minutes}:${this.state.time.seconds}`
 
    return(
    <div class="position-absolute start-50 top-50 translate-middle text-center">
        <div class="container">
          
          <div id="break-div">
           <h3 id="break-label">Break Length</h3>
          <h3 id="break-length">{break_minutes}</h3>
          <div class="flex-row justfiy-content-center mb-3">
        <button id="break-increment" class="btn col mx-1 my-1" onClick={this.inc_b}>Break Increment</button>
        <button id="break-decrement" class="btn col mx-1 my-1" onClick={this.dec_b} >Break Decrement</button>     
   
            </div>
          </div>
          
          <div id="session-div">
            
          <h3 id="session-label">Session Length</h3>            
          <h3 id="session-length">{session_minutes}</h3>
            
          <div class="flex-row mb-3">     
        <button id="session-increment" class="btn col mx-1 my-1"  onClick={this.inc_s}>Session Increment</button>
        <button id="session-decrement" class="btn col mx-1 my-1" onClick={this.dec_s}>Session Decrement</button>   
          </div>
          </div>
          
      </div>
        <div id="timer-div">
        <h1 id="timer-label">Session</h1>
        <h2 id="time-left" class="mb-4">{time}</h2>
        <audio id="beep" src="https://cdn.pixabay.com/download/audio/2022/03/19/audio_b1e725b098.mp3?filename=beep-6-96243.mp3"></audio>
        <div class="mb-2">
        <button id="start_stop" class="btn"  onClick={this.start_stop_count}>Start Stop</button>
        </div>
        <button id="reset" class="btn"  onClick={this.reset}>Reset</button>
          </div>
    </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById("root"))

/*
This is for freecodecamp project

// Stuff I've used //

Bootstrap - React - ReactDOM - Babel

Sound - Beep 6 - pixabay.com / Eponn => https://pixabay.com/sound-effects/beep-6-96243/

*/
