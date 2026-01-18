export class JwtPayloadDto {
  UserName?: string | "";
  UserId?: string | "";
  SeasonId?: string| "";
  CompanyId?: string | "";
  UserType?: string | "";
  exp?: string | "" ;
  roles?: string | "";

  static fromObject(obj: any): JwtPayloadDto {
    const dto = new JwtPayloadDto();
    if (!obj || typeof obj !== 'object') return dto;

    dto.UserName = obj?.UserName ?? obj?.username ?? obj?.userName ?? "";
    dto.UserId = obj?.UserId ?? obj?.userId ?? obj?.UserID ?? "";
    dto.SeasonId = obj?.SeasonId ?? obj?.seasonId ?? "";
    dto.CompanyId = obj?.CompanyId ?? obj?.companyId ?? "";
    dto.UserType = obj?.UserType ?? obj?.userType ?? "";

    // Normalize exp: if it's a number convert to string; if it's a non-empty string keep it; otherwise empty string
    const rawExp = obj?.exp ?? obj?.Exp ?? obj?.Expiraton ?? obj?.expiration;
    if (typeof rawExp === 'number') {
      dto.exp = String(rawExp);
    } else if (typeof rawExp === 'string' && rawExp.trim() !== '') {
      dto.exp = rawExp;
    } else {
      dto.exp = "";
    }

    const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    let roles: any = obj?.[roleClaim] ?? obj?.roles ?? obj?.role;
    if (Array.isArray(roles)) dto.roles = roles.map(String).join(',');
    else if (typeof roles === 'string') dto.roles = roles;
    else dto.roles = "";

    return dto;
  }
}
