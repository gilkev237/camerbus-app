import jsPDF from 'jspdf'
import QRCode from 'qrcode'

export type TicketPassenger = {
  fullName: string
  phone?: string
}

export type TicketData = {
  reference: string
  from: string
  to: string
  date: string
  seats: Array<string | number>
  totalPrice?: number
  busType?: string
  passengers?: TicketPassenger[]
}

const formatDateFR = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })
  } catch {
    return dateString
  }
}

function buildDocSkeleton(doc: jsPDF, data: TicketData) {
  const margin = 40
  let y = margin

  // Header background
  doc.setFillColor(0, 122, 94)
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 90, 'F')

  // Logo (simple square + star) and brand
  const logoX = margin
  const logoY = 26
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(logoX, logoY, 38, 38, 8, 8, 'F')
  doc.setTextColor(0, 122, 94)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('★', logoX + 12, logoY + 26)

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.text('CamerBus - Billet de réservation', margin + 54, 55)

  // Reference box
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(255, 255, 255)
  doc.roundedRect(doc.internal.pageSize.getWidth() - 250, 25, 210, 40, 8, 8, 'FD')
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.text('Référence', doc.internal.pageSize.getWidth() - 235, 45)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(data.reference, doc.internal.pageSize.getWidth() - 235, 62)

  // Body start
  y = 120
  doc.setTextColor(0, 0, 0)

  // Trip details
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Détails du voyage', margin, y)
  y += 12
  doc.setDrawColor(230, 230, 230)
  doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y)
  y += 18

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.text(`Départ: ${data.from}`, margin, y)
  y += 18
  doc.text(`Destination: ${data.to}`, margin, y)
  y += 18
  doc.text(`Date: ${formatDateFR(data.date)}`, margin, y)
  y += 18
  if (data.busType) {
    doc.text(`Type de bus: ${data.busType}`, margin, y)
    y += 18
  }
  doc.text(`Places: ${data.seats.join(', ')}`, margin, y)
  y += 26

  // Passengers
  if (data.passengers && data.passengers.length) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Passagers', margin, y)
    y += 12
    doc.setDrawColor(230, 230, 230)
    doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y)
    y += 18

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    data.passengers.forEach((p, idx) => {
      const seat = data.seats[idx] ?? ''
      doc.text(`${idx + 1}. ${p.fullName}  ${seat ? `(Place ${seat})` : ''}${p.phone ? `  •  ${p.phone}` : ''}`, margin, y)
      y += 18
    })
    y += 8
  }

  // Payment summary
  if (typeof data.totalPrice === 'number') {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Paiement', margin, y)
    y += 12
    doc.setDrawColor(230, 230, 230)
    doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y)
    y += 18

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    const amount = (() => {
      try {
        // Use ASCII-safe thousands separator to avoid PDF font issues with NBSP
        return (data.totalPrice as number).toLocaleString('en-US')
      } catch {
        return String(data.totalPrice)
      }
    })()
    doc.text(`Montant total: ${amount} FCFA`, margin, y)
    y += 26
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 60
  doc.setDrawColor(230, 230, 230)
  doc.line(margin, footerY, doc.internal.pageSize.getWidth() - margin, footerY)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text('Merci d\'avoir choisi CamerBus. Présentez ce billet et une pièce d\'identité lors de l\'embarquement.', margin, footerY + 20)

  return { margin }
}

export async function downloadBookingPdfAsync(data: TicketData) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const { margin } = buildDocSkeleton(doc, data)

  // Real QR Code (data URL) with reference encoded
  const qrPayload = JSON.stringify({ ref: data.reference, r: data.to, d: data.date })
  const qrDataUrl = await QRCode.toDataURL(qrPayload, { errorCorrectionLevel: 'M', margin: 1, width: 240 })

  // Place QR
  const right = doc.internal.pageSize.getWidth() - margin
  const qrSize = 120
  const qrX = right - qrSize
  const qrY = 130
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)

  const fileName = `${data.reference || 'billet-camerbus'}.pdf`
  doc.save(fileName)
}

// Backward compatibility (without QR). Prefer downloadBookingPdfAsync
export function downloadBookingPdf(data: TicketData) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const { margin } = buildDocSkeleton(doc, data)

  // Placeholder QR frame (sync)
  const right = doc.internal.pageSize.getWidth() - margin
  const qrSize = 120
  const qrX = right - qrSize
  const qrY = 130
  doc.setDrawColor(200, 200, 200)
  doc.roundedRect(qrX, qrY, qrSize, qrSize, 8, 8)
  doc.setFontSize(10)
  doc.text('QR Code', qrX + qrSize / 2, qrY + qrSize / 2, { align: 'center' })
  doc.setFontSize(9)
  doc.text(data.reference, qrX + qrSize / 2, qrY + qrSize / 2 + 14, { align: 'center' })

  const fileName = `${data.reference || 'billet-camerbus'}.pdf`
  doc.save(fileName)
}
