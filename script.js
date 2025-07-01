document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ageForm');
    const resultsDiv = document.getElementById('results');
    
    // Set max date to today to prevent future dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthDate').setAttribute('max', today);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateAge();
    });
    
    function calculateAge() {
        const birthDateInput = document.getElementById('birthDate').value;
        
        if (!birthDateInput) {
            alert('Please select your birth date');
            return;
        }
        
        const birthDate = new Date(birthDateInput);
        const today = new Date();
        
        // Validate birth date
        if (birthDate >= today) {
            alert('Birth date cannot be in the future');
            return;
        }
        
        // Calculate age
        const ageData = getDetailedAge(birthDate, today);
        
        // Display results
        displayResults(ageData);
        
        // Show results with animation
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    function getDetailedAge(birthDate, currentDate) {
        // Calculate exact age
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();
        
        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calculate total days lived
        const timeDiff = currentDate.getTime() - birthDate.getTime();
        const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        const totalHours = Math.floor(timeDiff / (1000 * 3600));
        const totalMinutes = Math.floor(timeDiff / (1000 * 60));
        
        // Calculate next birthday
        const nextBirthday = getNextBirthday(birthDate, currentDate);
        const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        
        // Get day of week born
        const dayOfWeekBorn = getDayOfWeek(birthDate);
        
        return {
            years,
            months,
            days,
            totalDays,
            totalHours,
            totalMinutes,
            nextBirthday,
            daysUntilBirthday,
            dayOfWeekBorn
        };
    }
    
    function getNextBirthday(birthDate, currentDate) {
        const nextBirthday = new Date(
            currentDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );
        
        // If birthday has passed this year, get next year's birthday
        if (nextBirthday <= currentDate) {
            nextBirthday.setFullYear(currentDate.getFullYear() + 1);
        }
        
        return nextBirthday;
    }
    
    function getDayOfWeek(date) {
        const days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ];
        return days[date.getDay()];
    }
    
    function formatNumber(num) {
        return num.toLocaleString();
    }
    
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    function displayResults(ageData) {
        // Update age display
        document.getElementById('years').textContent = ageData.years;
        document.getElementById('months').textContent = ageData.months;
        document.getElementById('days').textContent = ageData.days;
        
        // Update detailed information
        document.getElementById('totalDays').textContent = formatNumber(ageData.totalDays);
        document.getElementById('totalHours').textContent = formatNumber(ageData.totalHours);
        document.getElementById('totalMinutes').textContent = formatNumber(ageData.totalMinutes);
        document.getElementById('nextBirthday').textContent = formatDate(ageData.nextBirthday);
        document.getElementById('daysUntilBirthday').textContent = ageData.daysUntilBirthday;
        document.getElementById('dayOfWeekBorn').textContent = ageData.dayOfWeekBorn;
        
        // Add animation to numbers
        animateNumbers();
    }
    
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.age-number');
        
        numberElements.forEach(element => {
            const finalValue = parseInt(element.textContent);
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 50);
            const duration = 1000; // 1 second
            const stepTime = duration / (finalValue / increment);
            
            element.textContent = '0';
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    element.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    element.textContent = currentValue;
                }
            }, stepTime);
        });
    }
    
    // Add some fun facts based on age
    function addFunFacts(ageData) {
        // This could be extended to show interesting facts
        // For now, we'll keep it simple with the current display
    }
    
    // Auto-focus on the date input when page loads
    setTimeout(() => {
        document.getElementById('birthDate').focus();
    }, 500);
});

// Add some keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press Enter to calculate (when date is selected)
    if (e.key === 'Enter' && document.getElementById('birthDate').value) {
        document.getElementById('ageForm').dispatchEvent(new Event('submit'));
    }
});