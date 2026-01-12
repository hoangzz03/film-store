import React from 'react';
import ItemBlog from '../../components/ItemBlog';
const BlogPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <ItemBlog key={index} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;