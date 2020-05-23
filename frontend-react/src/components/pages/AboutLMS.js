import React from "react";

export default class AboutLMS extends React.Component {
    render () {
        return (
            <div>
                <h1>Welcome</h1>
                <p>Welcome to my Library Management System. This
                is a web application that would be used for
                managing a library organization, such as your
                local county library along with their network of
                branches. With it, you can manage branches, book
                            inventory, checkouts, members, and employees.</p>

                <h4>How do I log in?</h4>
                <p>If you would like to demo the admin side, feel
                free to contact me and I will send you the login
                            details!</p>

                <h4>How did you build this?</h4>
                <p>I built this with React and Ruby on Rails.</p>

                <h4>Source code</h4>
                <p>The source code is available on <a
                    href="https://github.com/brlafreniere/lms">GitHub</a>.</p>

                <h4>Me, elsewhere on the internet</h4>
                <ul>
                    <li><a href="http://blainelafreniere.io">My website and blog</a></li>
                    <li><a href="https://github.com/brlafreniere">GitHub</a></li>
                    <li><a href="https://twitter.com/brlafreniere">Twitter</a></li>
                </ul>
            </div>
        )
    }
}