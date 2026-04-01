#!/usr/bin/env python3
"""
Convert Algorithms Guide to PDF using reportlab
Clean alternative to weasyprint and pandoc
"""

import os
from pathlib import Path

def create_pdf_with_reportlab():
    """Create PDF using reportlab"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import cm
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
        from reportlab.lib import colors
        from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT
        
        # Read markdown file
        md_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.md")
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Create PDF
        pdf_path = Path(r"d:\karyasiddhi\ALGORITHMS_DEEP_DIVE_GUIDE.pdf")
        doc = SimpleDocTemplate(
            str(pdf_path),
            pagesize=A4,
            rightMargin=1.5*cm,
            leftMargin=1.5*cm,
            topMargin=1.5*cm,
            bottomMargin=1.5*cm
        )
        
        # Prepare styles
        styles = getSampleStyleSheet()
        
        style_title = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#2c3e50'),
            spaceAfter=12,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        style_heading2 = ParagraphStyle(
            'CustomHeading2',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#34495e'),
            spaceAfter=6,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        )
        
        style_body = ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontSize=10,
            textColor=colors.HexColor('#000000'),
            alignment=TA_JUSTIFY,
            spaceAfter=6,
            leading=14
        )
        
        # Build PDF elements
        elements = []
        
        # Title
        elements.append(Paragraph("Algorithms Deep Dive Guide", style_title))
        elements.append(Paragraph("KaryaSiddhi System - How Each Algorithm Works", styles['Normal']))
        elements.append(Spacer(1, 0.5*cm))
        elements.append(Paragraph("Date: March 31, 2026 | Scope: 15+ Algorithms | For Mentors & Stakeholders", styles['Normal']))
        elements.append(PageBreak())
        
        # Parse content into sections
        lines = content.split('\n')
        
        for i, line in enumerate(lines):
            line = line.strip()
            
            if not line:
                continue
            
            # Check for headers
            if line.startswith('# '):
                if len(elements) > 2:
                    elements.append(PageBreak())
                title = line.replace('# ', '').strip()
                elements.append(Paragraph(title, style_title))
                elements.append(Spacer(1, 0.3*cm))
                
            elif line.startswith('## '):
                heading = line.replace('## ', '').strip()
                elements.append(Paragraph(heading, style_heading2))
                elements.append(Spacer(1, 0.2*cm))
                
            elif line.startswith('### '):
                heading = line.replace('### ', '').strip()
                subheading = ParagraphStyle(
                    'SubHeading',
                    parent=styles['Heading3'],
                    fontSize=11,
                    textColor=colors.HexColor('#7f8c8d'),
                    spaceAfter=4,
                    fontName='Helvetica-Bold'
                )
                elements.append(Paragraph(heading, subheading))
                
            elif line.startswith('- ') or line.startswith('* '):
                bullet = line[2:].strip()
                elements.append(Paragraph(f"• {bullet}", style_body))
                
            elif line:
                # Regular paragraph
                if not line.startswith('```') and not line.startswith('|'):
                    elements.append(Paragraph(line, style_body))
                    elements.append(Spacer(1, 0.15*cm))
        
        # Build PDF
        doc.build(elements)
        print(f"✓ PDF created successfully: {pdf_path}")
        return True
        
    except ImportError:
        print("✗ reportlab not available")
        return False
    except Exception as e:
        print(f"✗ Error creating PDF: {e}")
        return False

def main():
    print("=" * 70)
    print("CREATING PDF FROM ALGORITHMS DEEP DIVE GUIDE")
    print("=" * 70)
    print()
    
    if create_pdf_with_reportlab():
        print()
        print("✓ PDF creation successful!")
        print("\nFiles created:")
        print("  - ALGORITHMS_DEEP_DIVE_GUIDE.pdf (primary)")
        print("  - ALGORITHMS_DEEP_DIVE_GUIDE.html (backup for browser viewing)")
        return True
    else:
        print("\n📌 Alternative: Use the HTML file")
        print("   Open: ALGORITHMS_DEEP_DIVE_GUIDE.html")
        print("   Then: Ctrl+P -> Save as PDF")

if __name__ == "__main__":
    main()
