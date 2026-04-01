#!/usr/bin/env python3
"""Create short, clean PDF from Quick Guide"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from pathlib import Path

def create_quick_pdf():
    # Read markdown
    md_path = Path(r"d:\karyasiddhi\ALGORITHMS_QUICK_GUIDE.md")
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create PDF
    pdf_path = Path(r"d:\karyasiddhi\ALGORITHMS_QUICK_GUIDE.pdf")
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm
    )
    
    # Styles
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'Heading',
        parent=styles['Heading2'],
        fontSize=12,
        textColor=colors.HexColor('#34495e'),
        spaceAfter=6,
        spaceBefore=10,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['BodyText'],
        fontSize=9,
        textColor=colors.HexColor('#000000'),
        spaceAfter=4,
        leading=11
    )
    
    # Build elements
    elements = []
    
    # Title
    elements.append(Paragraph("ALGORITHMS QUICK GUIDE", title_style))
    elements.append(Paragraph("Essential Information Only - Easy to Read", styles['Normal']))
    elements.append(Spacer(1, 0.3*cm))
    
    # Parse content
    lines = content.split('\n')
    
    for line in lines:
        line = line.rstrip()
        
        if not line:
            elements.append(Spacer(1, 0.1*cm))
            continue
        
        # Headers
        if line.startswith('# '):
            elements.append(Paragraph(line.replace('# ', ''), heading_style))
            
        elif line.startswith('## '):
            elements.append(Paragraph(line.replace('## ', ''), heading_style))
            
        elif line.startswith('### '):
            sub = line.replace('### ', '')
            sub_style = ParagraphStyle('SubHead', parent=styles['Heading3'], fontSize=10, fontName='Helvetica-Bold')
            elements.append(Paragraph(sub, sub_style))
            
        elif line.startswith('**') and line.endswith('**'):
            bold = line.replace('**', '')
            elements.append(Paragraph(f"<b>{bold}</b>", body_style))
            
        elif line.startswith('- ') or line.startswith('* '):
            bullet = line[2:].strip()
            elements.append(Paragraph(f"• {bullet}", body_style))
            
        elif line.startswith('|'):
            # Skip table markers but keep content
            pass
            
        elif line:
            elements.append(Paragraph(line, body_style))
    
    # Build
    doc.build(elements)
    print(f"✓ Quick PDF created: {pdf_path}")
    return True

if __name__ == "__main__":
    create_quick_pdf()
