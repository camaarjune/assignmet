function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate input dates
    if (start > end) {
        throw new Error("Start date must be before end date.");
    }

    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    const totalDays = calculateDays(start, end);
    let totalWorkingDays = 0;

    const yearMonths = Array.from({ length: 12 }, (_, i) => new Date(0, i));

    for (let month = 0; month < yearMonths.length; month++) {
        const monthStart = new Date(start.getFullYear(), month, 1);
        const monthEnd = new Date(start.getFullYear(), month + 1, 0);
        let monthWorkingDays = 0;
        let monthWorkedDays = 0;

        // Check if the month is within the range
        if (monthEnd < start || monthStart > end) continue;

        // Calculate the number of working days excluding Fridays
        for (let day = monthStart; day <= monthEnd; day.setDate(day.getDate() + 1)) {
            if (day > end) break;
            const dayOfWeek = day.getDay();
            if (dayOfWeek !== 5) { // 5 is Friday
                monthWorkingDays++;
                if (day >= start && day <= end) {
                    monthWorkedDays++;
                }
            }
        }

        daysExcludingFridays.push(monthWorkingDays);
        daysWorkedExcludingFridays.push(monthWorkedDays);
        totalWorkingDays += monthWorkedDays;
    }

    // Calculate monthly targets
    const totalTarget = totalAnnualTarget / totalDays * totalWorkingDays;
    for (let i = 0; i < daysExcludingFridays.length; i++) {
        if (daysExcludingFridays[i] === 0) {
            monthlyTargets.push(0);
        } else {
            const monthlyTarget = (totalAnnualTarget / totalDays) * daysWorkedExcludingFridays[i];
            monthlyTargets.push(monthlyTarget);
        }
    }

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}

function calculateDays(start, end) {
    let totalDays = 0;
    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
        totalDays++;
    }
    return totalDays;
}

// Example Usage
console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));
