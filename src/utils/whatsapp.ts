export interface WhatsAppConsultationParams {
  productName: string;
  productCode: string;
  phoneNumber?: string;
}

const DEFAULT_PHONE_NUMBER = '+5492646286841';

export function openWhatsAppConsultation({ 
  productName, 
  productCode, 
  phoneNumber = DEFAULT_PHONE_NUMBER 
}: WhatsAppConsultationParams): void {
  const productUrl = `https://www.eldisco.com.ar/products/${productCode}`;
  
  const message = `Hola! Me interesa consultar sobre la disponibilidad del producto:

*${productName}*
Código: ${productCode}
Link web: ${productUrl}

¿Podrían confirmarme si está disponible y cuándo podría retirarlo?

¡Gracias!`;

  const encodedMessage = encodeURIComponent(message);
  const cleanPhoneNumber = phoneNumber.replace(/[+\s-]/g, '');
  
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}