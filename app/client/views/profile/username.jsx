import { Link, UI } from 'touchstonejs';

export default React.createClass({


    render() {
        return <Container>
            <div><h4>What should we call you?</h4></div>
            <div><h2>Your @username is unique. You can always change it later.</h2></div>
            <p/>
            <p/>
            <UI.Input type="text" placeholder="Username" onChange={this.updatePhone}/>
            <div>Suggestions:</div>
        </Container>
    }
});