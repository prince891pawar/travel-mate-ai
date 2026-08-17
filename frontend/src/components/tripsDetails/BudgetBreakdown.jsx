import React from 'react';

const BudgetBreakdown = () => {
  // Dummy budget data - will be replaced by backend integration
  const budget = {
    totalBudget: 60000,
    accommodation: 25000,
    food: 12000,
    transportation: 8000,
    activities: 5000,
    miscellaneous: 3000,
  };

  // Calculate estimated total from all categories
  const estimatedTotal =
    budget.accommodation +
    budget.food +
    budget.transportation +
    budget.activities +
    budget.miscellaneous;

  // Calculate remaining budget
  const remainingBudget = budget.totalBudget - estimatedTotal;

  // Calculate usage percentage (capped at 100% to prevent visual overflow)
  const usagePercentage = Math.min(
    budget.totalBudget === 0 ? 0 : (estimatedTotal / budget.totalBudget) * 100,
    100
  );

  // Determine budget status
  const isWithinBudget = estimatedTotal <= budget.totalBudget;
  const budgetDifference = Math.abs(budget.totalBudget - estimatedTotal);

  // Category breakdown with icons
  const categories = [
    { name: 'Accommodation', icon: '🏨', amount: budget.accommodation },
    { name: 'Food', icon: '🍴', amount: budget.food },
    { name: 'Transportation', icon: '🚕', amount: budget.transportation },
    { name: 'Activities', icon: '🎟️', amount: budget.activities },
    { name: 'Miscellaneous', icon: '🛍️', amount: budget.miscellaneous },
  ];

  /**
   * Format currency values to Indian Rupee format
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  /**
   * Calculate percentage of category relative to total estimated cost
   */
  const getCategoryPercentage = (amount) => {
    return estimatedTotal === 0 ? 0 : (amount / estimatedTotal) * 100;
  };

  return (
    <div className="w-full space-y-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Estimated Budget
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Plan your expenses and keep your trip within budget.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Estimated Cost Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">
            Total Estimated Cost
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {formatCurrency(estimatedTotal)}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Sum of all categories
          </p>
        </div>

        {/* Your Budget Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">
            Your Budget
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {formatCurrency(budget.totalBudget)}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Total allocation
          </p>
        </div>

        {/* Remaining Budget Card */}
        <div
          className={`border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${
            isWithinBudget
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <p
            className={`text-xs md:text-sm font-semibold uppercase tracking-wide mb-2 ${
              isWithinBudget ? 'text-green-700' : 'text-red-700'
            }`}
          >
            Remaining Budget
          </p>
          <p
            className={`text-2xl md:text-3xl font-bold ${
              isWithinBudget ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {formatCurrency(remainingBudget)}
          </p>
          <p
            className={`text-xs mt-2 ${
              isWithinBudget ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isWithinBudget ? 'Available' : 'Over budget'}
          </p>
        </div>
      </div>

      {/* Main Budget Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
          <p className="text-gray-600 text-sm font-semibold">Budget Progress</p>
          <p className="text-gray-900 font-bold text-sm md:text-base">
            {formatCurrency(estimatedTotal)} / {formatCurrency(budget.totalBudget)}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isWithinBudget
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}
            style={{ width: `${usagePercentage}%` }}
            role="progressbar"
            aria-valuenow={usagePercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        {/* Progress Text */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-600 text-xs">
            Budget allocation progress
          </p>
          <p className="text-gray-900 font-semibold text-sm">
            {usagePercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Budget Status Alert */}
      <div
        className={`border-l-4 rounded-lg p-4 md:p-6 ${
          isWithinBudget
            ? 'bg-green-50 border-l-green-500'
            : 'bg-red-50 border-l-red-500'
        }`}
      >
        <p
          className={`font-semibold text-base md:text-lg ${
            isWithinBudget ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {isWithinBudget ? '✓ You\'re within your budget' : '⚠ This trip exceeds your budget'}
        </p>
        <p
          className={`text-sm mt-2 ${
            isWithinBudget ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {isWithinBudget
            ? `You have ${formatCurrency(remainingBudget)} remaining for this trip.`
            : `This trip exceeds your budget by ${formatCurrency(budgetDifference)}.`}
        </p>
      </div>

      {/* Expense Categories Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
          Expense Categories
        </h3>

        <div className="space-y-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="pb-5 last:pb-0 last:border-b-0 border-b border-gray-100"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl" aria-label={category.name}>
                    {category.icon}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {category.name}
                  </span>
                </div>
                <span className="font-bold text-gray-900 text-sm md:text-base">
                  {formatCurrency(category.amount)}
                </span>
              </div>

              {/* Category Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${getCategoryPercentage(category.amount)}%` }}
                  ></div>
                </div>
                <span className="text-xs md:text-sm text-gray-600 font-semibold w-12 text-right">
                  {getCategoryPercentage(category.amount).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetBreakdown;