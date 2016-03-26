import { Link, UI } from 'touchstonejs';


export default React.createClass({


    render() {
        return <Container>
            <div><h4>Pick a profile picture</h4></div>
            <div><h2>Have a favorite selfie? Upload it now</h2></div>
            <p/>
            <p/>
            <UI.Input type="text" placeholder="Username" onChange={this.updatePhone}/>
            <div>Suggestions:</div>
            <footer>
                <div>Skip</div>
                <div>Next</div>
            </footer>
        </Container>
    }
})