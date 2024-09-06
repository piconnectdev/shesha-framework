﻿using Abp.TestBase;
using Shesha.Metadata;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Shesha.Tests.Metadata
{
    public class MetadataProvider_Tests: AbpIntegratedTestBase<SheshaTestModule>
    {
        [Fact]
        public async Task ShouldInclude_NotMappedProperties_TestAsync() 
        {
            var metadataProvider = Resolve<MetadataProvider>();
            
            var properties = await metadataProvider.GetPropertiesAsync(typeof(EntityWithReadonlyProp), "");

            var includesCalculatedReadonly = properties.Any(p => p.Path == nameof(EntityWithReadonlyProp.CalculatedReadonly));
            Assert.True(includesCalculatedReadonly, $"Calculated readonly property '{nameof(EntityWithReadonlyProp.CalculatedReadonly)}' must be included into metadata");

            var includesNotMappedReadWrite = properties.Any(p => p.Path == nameof(EntityWithReadonlyProp.NotMappedReadWrite));
            Assert.True(includesNotMappedReadWrite, $"Calculated not mapped read/write property '{nameof(EntityWithReadonlyProp.NotMappedReadWrite)}' must be included into metadata");
        }
    }
}
