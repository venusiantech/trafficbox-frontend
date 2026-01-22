
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
        // Remove markdown syntax for accurate word count
        const text = this.stripMarkdown(content);
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min${minutes > 1 ? 's' : ''} read`;
    },

    // Strip markdown syntax to get plain text
    stripMarkdown(content: string): string {
        return content
            // Remove code blocks
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`[^`]*`/g, '')
            // Remove headers
            .replace(/^#{1,6}\s+/gm, '')
            // Remove bold/italic
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/__([^_]+)__/g, '$1')
            .replace(/_([^_]+)_/g, '$1')
            // Remove links but keep text
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            // Remove images
            .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
            // Remove blockquotes
            .replace(/^>\s+/gm, '')
            // Remove horizontal rules
            .replace(/^[-*_]{3,}\s*$/gm, '')
            // Remove list markers
            .replace(/^[\s]*[-*+]\s+/gm, '')
            .replace(/^[\s]*\d+\.\s+/gm, '')
            // Clean up extra whitespace
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    },

    // Extract plain text excerpt from markdown content
    getExcerpt(content: string, maxLength: number = 150): string {
        const text = this.stripMarkdown(content);
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }
};
