import {addMessagePageAction} from "redux/actions";
import {connect} from "react-redux";
import React, {useEffect} from "react";

const lazyLoader = props => {
    useEffect(() => {
        window.onscroll = () => {
            const el = document.documentElement;
            const isBottomOfScreen = el.scrollTop + window.innerHeight === el.offsetHeight;
            if (isBottomOfScreen) {
                props.addMessagePage(props.currentPage)
            }
        }
        return () => {
            window.onscroll = null;
        };
    });

    return <span></span>
}

const mapStateToProps = state => {
    return {
        currentPage: state.currentPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addMessagePage: (page) => dispatch(addMessagePageAction(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(lazyLoader)