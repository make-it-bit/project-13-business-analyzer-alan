import { NextResponse } from 'next/server';
import getOrganizationPageUrl from '../../../../lib/getOrganizationPageUrl';
import getOrganizationData from '../../../../lib/getOrganizationData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (name) {
    const organizationPageUrl = await getOrganizationPageUrl(name);
    const organizationData = await getOrganizationData(organizationPageUrl);
    return NextResponse.json(organizationData);
  }

  return NextResponse.json({ error: 'Name value not provided' });
}
