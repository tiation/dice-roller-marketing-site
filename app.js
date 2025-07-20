// Initialize Stripe
const stripe = Stripe('your_publishable_key'); // Replace with your actual Stripe publishable key

// Handle subscription button clicks
document.querySelectorAll('.btn-subscribe').forEach(button => {
    button.addEventListener('click', async (e) => {
        const plan = e.target.dataset.plan;
        try {
            // Here you would typically make a call to your backend to create a Stripe Checkout Session
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan: plan,
                }),
            });
            
            const session = await response.json();
            
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    });
});

// Handle contact sales button
document.querySelector('.btn-contact').addEventListener('click', () => {
    window.location.href = 'mailto:tiatheone@protonmail.com?subject=Enterprise%20Dice%20Roller%20Inquiry';
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all feature cards and pricing cards
document.querySelectorAll('.feature-card, .price-card').forEach(card => {
    observer.observe(card);
});
