const bcrypt = require('bcrypt');

// Simulate stored admin password hash (this should be securely stored in an environment variable in production)
const storedAdminPasswordHash = process.env.ADMIN_PASSWORD_HASH; // Use an environment variable for security

module.exports = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { password, action } = req.body;

    if (!password || !action) {
        return res.status(400).json({ error: 'Password and action are required' });
    }

    try {
        // Compare the provided password with the stored hash
        const isValid = await bcrypt.compare(password, storedAdminPasswordHash);

        if (!isValid) {
            return res.status(403).json({ error: 'Invalid password. Action denied.' });
        }

        // If password is valid, perform the action
        switch (action) {
            case 'reset-leaderboard':
                // Reset leaderboard logic here
                // For example: resetLeaderboard();  // Make sure you define this function

                res.status(200).json({ message: 'Leaderboard has been reset.' });
                break;

            case 'master-reset':
                // Master reset logic here
                // For example: masterReset();  // You would implement this function

                res.status(200).json({ message: 'Master reset completed.' });
                break;

            // Add other actions here as needed
            default:
                res.status(400).json({ error: 'Invalid action' });
        }

    } catch (error) {
        console.error('Error during password check:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
