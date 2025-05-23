 // Counter to generate unique IDs
        let urlCounter = 1000; // Start from 1000 to get slightly longer codes
        
        // Base62 characters
        const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        // Storage for our URLs (in a real app, this would be a database)
        const urlDatabase = {};
        
        // Convert a number to Base62
        function toBase62(num) {
            if (num === 0) return '0';
            let result = '';
            while (num > 0) {
                result = base62Chars[num % 62] + result;
                num = Math.floor(num / 62);
            }
            return result;
        }
        
        // Main function to shorten URL
        function shortenUrl() {
            const longUrl = document.getElementById('longUrl').value.trim();
            
            if (!longUrl) {
                alert('Please enter a URL');
                return;
            }
            
            // Generate a short code
            const shortCode = toBase62(urlCounter++);
            
            // Store in our "database"
            urlDatabase[shortCode] = longUrl;
            
            // Create the shortened URL
            const shortUrl = `${window.location.origin}/${shortCode}`;
            
            // Display the result
            document.getElementById('result').innerHTML = `
                <strong>Short URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a><br>
                <strong>Original URL:</strong> ${longUrl}
            `;
        }
        
        // Handle redirection when a short URL is accessed
        window.onload = function() {
            const path = window.location.pathname.substring(1); // Remove leading slash
            if (path && urlDatabase[path]) {
                window.location.href = urlDatabase[path];
            }
        };