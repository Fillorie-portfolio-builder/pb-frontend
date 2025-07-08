const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            
            <div className="space-y-6 text-lg text-gray-700">
                <section>
                    <p >We'd love to hear from you!</p>
                    <p>
                        Whether you're a project creator or an aspiring professional, feel free to reach out with questions, 
                        feedback, or collaboration opportunities.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Email</h2>
                    <p>
                        <span className="font-medium">Email us at: </span>
                        <a href="mailto:info@spherekick.com" className="text-blue-600 hover:text-blue-800">
                            info@spherekick.com
                        </a>
                    </p>
                    <p className="text-lg text-gray-700 mt-2">
                        We typically respond within 1 - 2 business days.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Contact;