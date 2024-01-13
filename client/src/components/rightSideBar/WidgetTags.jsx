import React from 'react'

function WidgetTags() {
    const tags = [
        "c", "css", "express", "firebase", "html", "javascript", "java", "mern", "mongodb", "mysql", "next.js", "node.js", "php", "python", "reactjs"
    ]
    return (
        <div className='widget-tags'>
            <h4>Watched tags</h4>
            <div className='widget-tags-div'>
                {tags.map((tag) => (
                    <p key={tag}>{tag}</p>
                ))}
            </div>
        </div>
    )
}

export default WidgetTags