import NotifyPopup from './components/ui/NotifyPopup';


export default React.createClass({

    getInitialState(){
        return {
            popup: {
                visible: false
            }
        }
    },

    clickHandler () {
        this.setState({
            popup: {visible: !this.state.popup.visible}
        })
    },
    handleNotifyChange (e) {
        this.setState({
            popup: {visible: false}
        })
    },
    render(){
        return (
            <div>
                <button className="btn btn-primary" onClick={this.clickHandler} >button</button>
                <NotifyPopup template="test" subTitle="testing" template="test" visible={this.state.popup.visible} type="alert" onChange={this.handleNotifyChange}/>
            </div>
        )
    }
});