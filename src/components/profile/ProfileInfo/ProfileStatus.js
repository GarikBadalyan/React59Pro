import React from "react";

class ProfileStatus extends React.Component {
    // debugger
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        console.log('this', this)
        this.setState({
            editMode: true
            })
    }

    deActivateEditMode = () =>  {
        this.setState({
            editMode: false
        })
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkk', this.state)
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    render() {
        console.log('eeeeeeeeeeeeeeeeeeeeeeee', this.props)
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '----68-----'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode} value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus