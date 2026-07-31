import { Currency, CurrencyConfig } from '../types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 85.0 },
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
};

export function formatPrice(priceInUSD: number, currency: Currency = 'INR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = priceInUSD * config.rate;

  if (currency === 'INR') {
    // Format in Indian currency style e.g. ₹2,499
    const rounded = Math.round(converted);
    return `₹${rounded.toLocaleString('en-IN')}`;
  } else if (currency === 'AED') {
    return `${Math.round(converted).toLocaleString()} ${config.symbol}`;
  } else if (currency === 'USD' || currency === 'EUR' || currency === 'GBP') {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${config.symbol}${converted.toFixed(0)}`;
}
