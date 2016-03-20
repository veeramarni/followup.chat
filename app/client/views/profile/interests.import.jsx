import { Link, UI } from '{followupchat:app-deps}/packages/touchstonejs';


export default React.createClass({


    render() {
        return <Container>
            <div><h4>What are you interested in?</h4></div>
            <div><h2>Choose from the topics below, or add your own. Be as specific or as braod as you want.</h2></div>
            <p/>
            <p/>
            <UI.Input type="text" placeholder="Username" onChange={this.updatePhone}/>
            <div>Suggestions:</div>
        </Container>
    }
});