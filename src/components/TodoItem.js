import React, { Component } from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';

import checkImg from '../img/check.svg';
import checkCompleteImg from '../img/check-complete.svg';
import removeImg from '../img/remove.svg';
var classname = require('classname');


const REMOVE_IMG = removeImg;
class TodoItem extends Component {
    render() {
        const { item, onClick, onClickRemove } = this.props;
        let url = checkImg;
        if (item.isComplete) { url = checkCompleteImg };
        let className = classname({
            'TodoItem': true,
            'TodoItem-complete': item.isComplete
        });

        return (
            <div className={className}>
                <img
                    onClick={onClick}
                    src={"https://image.flaticon.com/icons/svg/1828/1828697.svg"}
                    alt="checking"
                    width="32"
                    height="32" />
                <p> {item.title} </p>
                <img
                    onClick={onClickRemove}
                    src={"https://image.flaticon.com/icons/svg/1828/1828843.svg"}
                    alt="remove"
                    width="32" height="32"
                    style={{ position: "absolute", right: '0' }} />
            </div>
        )
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        isComplete: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func.isRequired,
    onClickRemove: PropTypes.func.isRequired
};

export default TodoItem;