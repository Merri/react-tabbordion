import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class HeightTransition extends PureComponent {
    constructor(props) {
        super(props)

        this.getRef = this.getRef.bind(this)
    }

    componentDidUpdate() {

    }

    getRef(child) {
        this.child = child
    }

    render() {
        const { children, component: Component, style, ...props } = this.props

        return (
            <Component {...props} style={{ ...style }}>
                {React.cloneElement(React.Children.only(children), { ref: this.getRef })}
            </Component>
        )
    }
}

HeightTransition.defaultProps = {
    component: 'div',
}

HeightTransition.propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
}

export default HeightTransition
