
export interface BlogAuthor {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    summary: string;
    imageUrl: string;
    author: BlogAuthor | null;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface BlogsResponse {
    status: string;
    blogs: Blog[];
}

export const blogService = {
    // Fetch all public blogs
    async getPublicBlogs(): Promise<BlogsResponse> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/public`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // Disable caching for fresh data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: BlogsResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching public blogs:', error);
            throw error;
        }
    },

    // Get blog by slug
    async getBlogBySlug(slug: string): Promise<Blog | null> {
        try {
            const response = await this.getPublicBlogs();
            const blog = response.blogs.find((b) => b.slug === slug);
            return blog || null;
        } catch (error) {
            console.error('Error fetching blog by slug:', error);
            return null;
        }
    },

    // Helper function to format date
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    },

    // Helper function to calculate read time based on content
    calculateReadTime(content: string): string {
        const wordsPerMinute = 200;
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        const wordCount = text.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min${minutes > 1 ? 's' : ''} read`;
    },

    // Extract plain text excerpt from HTML content
    getExcerpt(content: string, maxLength: number = 150): string {
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }
};
