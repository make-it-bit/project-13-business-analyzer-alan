import { NextResponse } from 'next/server';
import getOrganizationPageUrl from '../../../../lib/getOrganizationPageUrl';
import getOrganizationData from '../../../../lib/getOrganizationData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (name) {
    const organizationPageUrl = await getOrganizationPageUrl(name);
    console.log('organizationPageUrl: ', organizationPageUrl);
    const organizationData = await getOrganizationData(organizationPageUrl);
    console.log('organizationData: ', organizationData);

    return NextResponse.json({ ok: 'ok' });
  }

  return NextResponse.json({ error: 'Name value not provided' });
}
