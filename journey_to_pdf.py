#!/usr/bin/env python3
"""Convert user journey markdown to PDF"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors

# Read markdown
with open('COMPLETE_USER_JOURNEY_AND_FLOW.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Create PDF
doc = SimpleDocTemplate('COMPLETE_USER_JOURNEY.pdf', pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
styles = getSampleStyleSheet()

title_style = ParagraphStyle('Title', parent=styles['Heading1'], fontSize=20, textColor=colors.HexColor('#1a1a1a'), spaceAfter=12, alignment=TA_CENTER, fontName='Helvetica-Bold')
h1_style = ParagraphStyle('H1', parent=styles['Heading1'], fontSize=14, textColor=colors.HexColor('#1f4788'), spaceBefore=8, spaceAfter=6, fontName='Helvetica-Bold')
h2_style = ParagraphStyle('H2', parent=styles['Heading2'], fontSize=11, textColor=colors.HexColor('#2c5aa0'), spaceBefore=6, spaceAfter=4, fontName='Helvetica-Bold')
body_style = ParagraphStyle('Body', parent=styles['BodyText'], fontSize=9, alignment=TA_JUSTIFY, spaceAfter=4)

story = []
lines = content.split('\n')

for i, line in enumerate(lines):
    if not line.strip():
        story.append(Spacer(1, 0.08*inch))
    elif line.startswith('# '):
        title = line.replace('# ', '').strip()
        title = title.replace('**', '').replace('`', '').replace('_', '')
        story.append(Paragraph(title, title_style))
    elif line.startswith('## '):
        heading = line.replace('## ', '').strip()
        heading = heading.replace('**', '').replace('`', '').replace('_', '')
        story.append(Paragraph(heading, h1_style))
    elif line.startswith('### '):
        heading = line.replace('### ', '').strip()
        heading = heading.replace('**', '').replace('`', '').replace('_', '')
        story.append(Paragraph(heading, h2_style))
    else:
        text = line.strip()
        # Remove markdown formatting
        text = text.replace('**', '').replace('_', '').replace('`', '')
        # Handle angle brackets
        text = text.replace('<', '&lt;').replace('>', '&gt;')
        if text and not text.startswith('│') and not text.startswith('├') and not text.startswith('└'):
            try:
                story.append(Paragraph(text, body_style))
            except:
                # Skip problematic lines
                pass

doc.build(story)
print('✓ PDF created: COMPLETE_USER_JOURNEY.pdf')
