import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise-solutions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Enterprise Solutions')
@Controller('enterprise')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EnterpriseController {
  constructor(private enterpriseService: EnterpriseService) {}

  // ============= AI MENTOR =============
  @Get('ai-mentor')
  @ApiOperation({ summary: 'Get AI Mentor feature data' })
  async getAIMentor(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getAIMentorData(targetUserId);
  }

  // ============= EMPATHY ENGINE =============
  @Get('empathy-engine')
  @ApiOperation({ summary: 'Get Empathy Engine feature data' })
  async getEmpathyEngine(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getEmpathyEngineData(targetUserId);
  }

  // ============= BLOCKCHAIN KARMA =============
  @Get('blockchain-karma')
  @ApiOperation({ summary: 'Get Blockchain Karma feature data' })
  async getBlockchainKarma(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getBlockchainKarmaData(targetUserId);
  }

  // ============= BHARATNET =============
  @Get('bharatnet')
  @ApiOperation({ summary: 'Get BharatNet Integration feature data' })
  async getBharatNet(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getBharatNetData(targetUserId);
  }

  // ============= CARNIVAL =============
  @Get('carnival')
  @ApiOperation({ summary: 'Get Carnival of Productivity feature data' })
  async getCarnival(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getCarnivalData(targetUserId);
  }

  // ============= GOVVERSE =============
  @Get('govverse')
  @ApiOperation({ summary: 'Get GovVerse feature data' })
  async getGovVerse(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getGovVerseData(targetUserId);
  }

  // ============= DIGITAL MIRROR =============
  @Get('digital-mirror')
  @ApiOperation({ summary: 'Get Digital Mirror feature data' })
  async getDigitalMirror(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getDigitalMirrorData(targetUserId);
  }

  // ============= DIGITAL TWIN =============
  @Get('digital-twin')
  @ApiOperation({ summary: 'Get Digital Twin feature data' })
  async getDigitalTwin(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getDigitalTwinData(targetUserId);
  }

  // ============= AR/VR TRAINING =============
  @Get('ar-vr-training')
  @ApiOperation({ summary: 'Get AR/VR Training feature data' })
  async getARVRTraining(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getARVRTrainingData(targetUserId);
  }

  // ============= MOOD-ADAPTIVE UI =============
  @Get('mood-adaptive-ui')
  @ApiOperation({ summary: 'Get Mood-Adaptive UI feature data' })
  async getMoodAdaptiveUI(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getMoodAdaptiveUIData(targetUserId);
  }

  // ============= DNA GOVERNANCE =============
  @Get('dna-governance')
  @ApiOperation({ summary: 'Get DNA Governance feature data' })
  async getDNAGovernance(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getDNAGovernanceData(targetUserId);
  }

  // ============= PRECOGNITION ENGINE =============
  @Get('precognition-engine')
  @ApiOperation({ summary: 'Get Precognition Engine feature data' })
  async getPrecognitionEngine(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getPrecognitionEngineData(targetUserId);
  }

  // ============= ZERO KNOWLEDGE PROOF =============
  @Get('zero-knowledge')
  @ApiOperation({ summary: 'Get Zero Knowledge Proof feature data' })
  async getZeroKnowledge(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getZeroKnowledgeData(targetUserId);
  }

  // ============= ECOSYSTEM INTELLIGENCE =============
  @Get('ecosystem-intelligence')
  @ApiOperation({ summary: 'Get Ecosystem Intelligence feature data' })
  async getEcosystemIntelligence(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getEcosystemIntelligenceData(targetUserId);
  }

  // ============= GAMIFICATION =============
  @Get('gamification')
  @ApiOperation({ summary: 'Get Gamification feature data' })
  async getGamification(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getGamificationData(targetUserId);
  }

  // ============= LABORATORY GOVERNANCE =============
  @Get('laboratory-governance')
  @ApiOperation({ summary: 'Get Laboratory Governance feature data' })
  async getLaboratoryGovernance(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getLaboratoryGovernanceData(targetUserId);
  }

  // ============= TIDAL WAVE ANALYTICS =============
  @Get('tidal-wave-analytics')
  @ApiOperation({ summary: 'Get Tidal Wave Analytics feature data' })
  async getTidalWaveAnalytics(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getTidalWaveData(targetUserId);
  }

  // ============= DEEPFAKE DETECTION =============
  @Get('deepfake-detection')
  @ApiOperation({ summary: 'Get Deepfake Detection feature data' })
  async getDeepfakeDetection(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getDeepfakeDetectionData(targetUserId);
  }

  // ============= ALGORITHMIC JUSTICE =============
  @Get('algorithmic-justice')
  @ApiOperation({ summary: 'Get Algorithmic Justice feature data' })
  async getAlgorithmicJustice(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getAlgorithmicJusticeData(targetUserId);
  }

  // ============= QUANTUM MANAGEMENT =============
  @Get('quantum-management')
  @ApiOperation({ summary: 'Get Quantum Management feature data' })
  async getQuantumManagement(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'Department Head' ? userId : req.user.id;
    return this.enterpriseService.getQuantumManagementData(targetUserId);
  }

  // ============= MANAGER DASHBOARD =============
  @Get('manager-dashboard')
  @ApiOperation({ summary: 'Get Manager Dashboard data' })
  async getManagerDashboard(@Request() req) {
    return this.enterpriseService.getManagerDashboardData(req.user.id);
  }

  // ============= TEAM ENTERPRISE METRICS =============
  @Get('team-metrics')
  @ApiOperation({ summary: 'Get Team Enterprise Metrics' })
  async getTeamMetrics(@Request() req) {
    return this.enterpriseService.getTeamEnterpriseMetrics(req.user.id);
  }

  // ============= DEPARTMENT ENTERPRISE STATS =============
  @Get('department-stats')
  @ApiOperation({ summary: 'Get Department Enterprise Statistics' })
  async getDepartmentStats(@Request() req, @Query('departmentId') departmentId?: string) {
    return this.enterpriseService.getDepartmentEnterpriseStats(departmentId);
  }
}
