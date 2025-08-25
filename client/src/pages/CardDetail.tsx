import { useState } from 'react';
import { ArrowLeft, HelpCircle, Eye, EyeOff, Snowflake, Settings, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CardDetail = ({ cardId = 'original' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  
  // Mock data based on screenshots
  const cardData = {
    original: {
      name: 'Original',
      type: 'original',
      number: '•• 4103',
      fullNumber: '5553 8900 9029 4103',
      expiryDate: '11/28',
      cvv: '472',
      logo: 'mastercard',
      gradient: 'linear-gradient(135deg, #E82C72 0%, #B934A8 25%, #7B4FC9 50%, #4A6FDB 75%, #3B8AE5 100%)',
      status: 'delivered',
      deliveryTracking: {
        ordered: { date: '4 Nov 2023', completed: true },
        posted: { date: '6 Nov 2023', completed: true },
        expected: { date: '10 Nov 2023', completed: true }
      },
      isActivated: false,
      showActivationPrompt: true,
      transactions: [
        {
          merchant: 'GitHub',
          amount: '$1.55',
          date: '17 August, 04:25',
          status: 'Reverted',
          icon: '⚫'
        },
        {
          merchant: 'GitHub',
          amount: '$15.46',
          date: '15 August, 03:39',
          status: 'Reverted',
          icon: '⚫'
        },
        {
          merchant: 'GitHub',
          amount: '-$6.18',
          subAmount: '-US$4',
          date: '15 August, 03:35',
          status: '',
          icon: '⚫'
        }
      ]
    }
  };

  const card = cardData[cardId as keyof typeof cardData];

  if (!card) {
    return <div>Card not found</div>;
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyFeedback(true);
    setTimeout(() => {
      setShowCopyFeedback(false);
    }, 2000);
  };

  const cardContainerStyle: React.CSSProperties = {
    perspective: '1000px',
    width: '100%',
    aspectRatio: '1.586',
    position: 'relative'
  };

  const cardInnerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
  };

  const cardFaceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '18px',
    background: card.gradient,
    padding: '24px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    cursor: 'pointer'
  };

  const cardBackStyle: React.CSSProperties = {
    ...cardFaceStyle,
    transform: 'rotateY(180deg)'
  };

  const originalTextStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 200,
    color: '#ffffff',
    letterSpacing: '0.8px',
    textShadow: `
      0 0 45px rgba(255, 255, 255, 1), 
      0 0 35px rgba(255, 255, 255, 0.9), 
      0 0 25px rgba(255, 255, 255, 0.7),
      0 0 15px rgba(255, 255, 255, 0.5),
      0 0 8px rgba(255, 255, 255, 0.3),
      0 2px 4px rgba(255, 255, 255, 0.2)
    `,
    filter: 'brightness(1.2)'
  };

  const copyButtonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1.5px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-5 py-3 text-white">
        <div className="flex items-center gap-1">
          <span className="text-[17px] font-semibold">19:30</span>
          <span>🌙</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>📶</span>
          <div className="flex items-center gap-1">
            <div className="w-[25px] h-[12px] border border-white rounded-sm relative px-[1px]">
              <div className="w-[78%] h-full bg-white rounded-[1px]"></div>
              <div className="absolute -right-[3px] top-[3px] w-[2px] h-[4px] bg-white rounded-r-[1px]"></div>
            </div>
            <span className="text-sm">78</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4" style={{ background: 'linear-gradient(180deg, #2A4789 0%, #365198 100%)' }}>
        <button className="text-white text-2xl">←</button>
        <button className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center text-sm">
          ?
        </button>
      </div>

      {/* Main Container */}
      <div style={{ background: 'linear-gradient(180deg, #365198 0%, #1C1C1E 25%)' }}>
        {/* Card Section */}
        <div className="px-5 pb-6" style={{ filter: 'drop-shadow(0 10px 30px rgba(233, 44, 114, 0.15))' }}>
          <div style={cardContainerStyle}>
            <div style={cardInnerStyle}>
              {/* Card Front */}
              <div style={cardFaceStyle} onClick={handleFlipCard}>
                <div style={originalTextStyle}>{card.name}</div>
                <div className="flex justify-between items-end">
                  <div style={{ fontSize: '24px', letterSpacing: '3.5px', color: 'rgba(255, 255, 255, 0.95)', fontWeight: 300, marginLeft: '10px', marginBottom: '5px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    {card.number}
                  </div>
                  {/* Mastercard Logo V3 (48px) */}
                  <div style={{ display: 'flex', position: 'relative', width: '75px', height: '48px', marginRight: '4px', marginBottom: '10px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0, opacity: 0.95 }}></div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FF9500', position: 'absolute', left: '27px', opacity: 0.95 }}></div>
                  </div>
                </div>
              </div>

              {/* Card Back */}
              <div style={cardBackStyle} onClick={handleFlipCard}>
                <div className="flex-1 flex flex-col justify-center gap-8">
                  <div>
                    <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300, letterSpacing: '0.3px', marginBottom: '8px' }}>
                      Card number
                    </div>
                    <div className="flex items-center gap-4">
                      <div style={{ fontSize: '28px', color: '#ffffff', fontWeight: 400, letterSpacing: '3.5px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                        {card.fullNumber}
                      </div>
                      <button 
                        style={copyButtonStyle}
                        onClick={(e) => { e.stopPropagation(); copyToClipboard(card.fullNumber); }}
                        className="hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95"
                      >
                        <Copy size={16} color="rgba(255,255,255,0.8)" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-12">
                    <div>
                      <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300, letterSpacing: '0.3px', marginBottom: '8px' }}>
                        Expiry date
                      </div>
                      <div style={{ fontSize: '24px', color: '#ffffff', fontWeight: 400, letterSpacing: '2.5px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                        {card.expiryDate}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300, letterSpacing: '0.3px', marginBottom: '8px' }}>
                        CVV
                      </div>
                      <div className="flex items-center gap-3">
                        <div style={{ fontSize: '24px', color: '#ffffff', fontWeight: 400, letterSpacing: '2.5px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                          {card.cvv}
                        </div>
                        <button 
                          style={copyButtonStyle}
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(card.cvv); }}
                          className="hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95"
                        >
                          <Copy size={16} color="rgba(255,255,255,0.8)" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  {/* Mastercard Logo */}
                  <div style={{ display: 'flex', position: 'relative', width: '75px', height: '48px', marginRight: '4px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0, opacity: 0.95 }}></div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FF9500', position: 'absolute', left: '27px', opacity: 0.95 }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around px-5 py-6 bg-[#1C1C1E]">
          <button className="flex flex-col items-center gap-2" onClick={handleFlipCard}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full" 
                 style={{ background: 'linear-gradient(135deg, #4A9BFF 0%, #3A7FE5 100%)', boxShadow: '0 4px 15px rgba(74, 155, 255, 0.3)' }}>
              {isFlipped ? (
                <EyeOff size={22} color="white" strokeWidth={1.5} />
              ) : (
                <Eye size={22} color="white" strokeWidth={1.5} />
              )}
            </div>
            <span className="text-sm text-white">{isFlipped ? 'Hide details' : 'Show details'}</span>
          </button>
          
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <Snowflake size={24} color="white" strokeWidth={1.5} />
            </div>
            <span className="text-sm text-white">Freeze</span>
          </button>
          
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <Settings size={24} color="white" strokeWidth={1.5} />
            </div>
            <span className="text-sm text-white">Settings</span>
          </button>
        </div>

        {/* Activation Section */}
        {card.showActivationPrompt && (
          <div className="px-5 py-5 bg-[#1C1C1E]">
            <h3 className="text-xl font-medium mb-2">Received your card?</h3>
            <p className="text-gray-400 text-base mb-4">
              Activate your physical card to use it in-store. You can still shop online without activation, using Apple Pay
            </p>
            <button className="w-auto px-8 py-3 bg-[#3A3A3C] hover:bg-[#4A4A4C] text-white rounded-[22px] font-medium transition-all hover:translate-y-[-1px] hover:shadow-lg">
              Activate now
            </button>
          </div>
        )}

        {/* Delivery Tracking */}
        <div className="px-5 py-5 bg-[#1C1C1E]">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-medium">Should have arrived</h3>
            <a href="#" className="text-[#4A9BFF] hover:text-[#6AAFFF] transition-colors">Track delivery</a>
          </div>
          
          <div className="relative mb-2">
            <div className="absolute top-2 left-[10%] right-[10%] h-[3px]" 
                 style={{ background: 'linear-gradient(90deg, #007AFF 33%, #007AFF 66%, #8E8E93 66%)' }}></div>
            <div className="flex justify-between relative">
              <div className="flex-1 text-center relative">
                <div className="w-4 h-4 bg-[#007AFF] rounded-full mx-auto mb-2 relative z-10"></div>
                <div className="text-sm text-white mb-1">Ordered</div>
                <div className="text-sm text-gray-500">{card.deliveryTracking.ordered.date}</div>
              </div>
              <div className="flex-1 text-center relative">
                <div className="w-4 h-4 bg-[#007AFF] rounded-full mx-auto mb-2 relative z-10"></div>
                <div className="text-sm text-white mb-1">Posted</div>
                <div className="text-sm text-gray-500">{card.deliveryTracking.posted.date}</div>
              </div>
              <div className="flex-1 text-center relative">
                <div className="w-4 h-4 bg-[#8E8E93] rounded-full mx-auto mb-2 relative z-10"></div>
                <div className="text-sm text-white mb-1">Expected</div>
                <div className="text-sm text-gray-500">{card.deliveryTracking.expected.date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="px-5 py-5 bg-[#1C1C1E]">
          {card.transactions.map((transaction, index) => (
            <div key={index} className="flex items-center py-4 border-b border-[#2C2C2E] last:border-b-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mr-4 relative shadow-sm">
                <div className="w-[30px] h-[30px] bg-[#1a1a1a] rounded-full"></div>
                {transaction.status === 'Reverted' && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full relative">
                      <span className="absolute -top-[3px] -left-[1px] text-[9px] font-bold text-white">↺</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="text-base font-medium">{transaction.merchant}</div>
                <div className="text-sm text-gray-500">
                  {transaction.date} {transaction.status && `· ${transaction.status}`}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-base font-medium">{transaction.amount}</div>
                {transaction.subAmount && (
                  <div className="text-sm text-gray-500">{transaction.subAmount}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-5 bg-[#1C1C1E]">
          <button className="text-white text-base bg-transparent border-0">See all</button>
        </div>
      </div>

      {/* Copy Feedback Toast */}
      {showCopyFeedback && (
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-6 py-3 rounded-full text-sm font-medium z-50"
          style={{
            background: 'rgba(76, 175, 80, 0.95)',
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
            opacity: showCopyFeedback ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          Copied to clipboard!
        </div>
      )}

      {/* Home indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default CardDetail;
